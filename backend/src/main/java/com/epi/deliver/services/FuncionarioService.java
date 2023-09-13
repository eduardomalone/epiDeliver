package com.epi.deliver.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epi.deliver.dto.FuncionarioDTO;
import com.epi.deliver.dto.LoginDTO;
import com.epi.deliver.entities.TabFuncionario;
import com.epi.deliver.mappers.FuncionarioMapper;
import com.epi.deliver.repositories.FuncionarioRepository;

@Service
public class FuncionarioService {
	

	@Value("${status.variable.ativo}")
	private String status;
	

	@Value("${status.variable.inativo}")
	private String statusInativo;


	@Autowired
	private FuncionarioRepository repository;
	

	@Autowired
	private final PasswordEncoder encoder;
	
	@Autowired
	private LoginService loginService;
	
	

	public FuncionarioService(FuncionarioRepository repository, PasswordEncoder encoder) {
		this.repository = repository;
		this.repository = repository;
		//this.logginMapper = logginMapper;
		this.encoder = encoder;
	}

	

	@Transactional(readOnly = true)
	public List<FuncionarioDTO> findFuncio(String registro, Long idCliente) {
		List<TabFuncionario> list = repository.findByRegistroAndIdClienteAndStatus(registro, idCliente, status);
		if (!list.isEmpty()) {
		}
		return list.stream().map(x -> new FuncionarioDTO(x)).collect(Collectors.toList());
	}

	@Transactional
	public FuncionarioDTO save(FuncionarioDTO funcionario) {
		FuncionarioMapper mapper = new FuncionarioMapper();
		funcionario.setStatus(status);
		TabFuncionario list = repository.save(mapper.convertEntity(funcionario));
		if(funcionario.getPerf() != null) {
			LoginDTO loginPesquisa = loginService.findByIdFuncioLogin(list.getId(), list.getRegistro());
			LoginDTO login = new LoginDTO();
			if(loginPesquisa != null) {
				login.setId(loginPesquisa.getId());
			}
			login.setIdFuncio(list.getId());
			login.setIdPerfil(funcionario.getPerf());
			login.setLogin(list.getRegistro());
			login.setSenha(encoder.encode(list.getRegistro()));
			
			loginService.save(login);
		}
		// if(!list.isEmpty()) {}
		return new FuncionarioDTO(list);
	}

	@Transactional(readOnly = true)
	public List<FuncionarioDTO> findAll() {
		List<TabFuncionario> list = repository.findAll();
		if (!list.isEmpty()) {
		}
		return list.stream().map(x -> new FuncionarioDTO(x)).collect(Collectors.toList());

	}

	@Transactional(readOnly = true)
	public List<FuncionarioDTO> findByIdCliente(Long idCliente) {
		List<TabFuncionario> list = repository.findByIdClienteAndStatus(idCliente, status);
		if (!list.isEmpty()) {
		}
		return list.stream().map(x -> new FuncionarioDTO(x)).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public List<FuncionarioDTO> findByIdAndIdCliente(Long id, Long idCliente) {
		List<TabFuncionario> list = repository.findByIdAndIdClienteAndStatus(id, idCliente, status);
		 
		if (!list.isEmpty()) {
			return list.stream().map(x -> new FuncionarioDTO(x)).collect(Collectors.toList());
		} else {
			ArrayList<FuncionarioDTO> lista = new ArrayList<>();
			return lista;
		}
	}

	@Transactional(readOnly = true)
	public List<FuncionarioDTO> findBy(Long idCliente) {
		List<TabFuncionario> list = repository.findByIdClienteAndStatus(idCliente, status);
		if (!list.isEmpty()) {
		}
		return list.stream().map(x -> new FuncionarioDTO(x)).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public List<FuncionarioDTO> findByNomeContainingAndIdCliente(Long idCliente, String nome) {
		List<TabFuncionario> list = repository.findByNomeContainingIgnoreCaseAndIdClienteAndStatus(nome, idCliente, status);
		if (!list.isEmpty()) {
		}
		return list.stream().map(x -> new FuncionarioDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public List<FuncionarioDTO> findByRegistroAndIdCliente(Long idCliente, String registro) {
		List<TabFuncionario> list = repository.findByRegistroAndIdClienteAndStatus(registro, idCliente, status);
		if (!list.isEmpty()) {
		}
		return list.stream().map(x -> new FuncionarioDTO(x)).collect(Collectors.toList());
	}

	@Transactional
	public String cargaFuncionario(Long codCli, String pathFile) {

		String msg = "";
		Path path = Paths.get(pathFile);
		FuncionarioDTO funcionario = new FuncionarioDTO();
		List<TabFuncionario> listTabFunc = new ArrayList();
		List<FuncionarioDTO> listFunc = new ArrayList();

		List<String> linhasArquivo = new ArrayList<String>();
		try {

			if (Files.exists(path)) {

				linhasArquivo = Files.readAllLines(path);
				//Stream<String> stream = Files.lines(path);

				
				for (int i = 0; i < linhasArquivo.size(); i++) {
					
					if(linhasArquivo.get(i).split(";").length != 5) {
						return msg = "400";
					}
					TabFuncionario tabFuncionario = new TabFuncionario();
					String strArr[] = linhasArquivo.get(i).split(";");
					tabFuncionario.setIdCliente(codCli);
					tabFuncionario.setRegistro(strArr[0]);
					tabFuncionario.setNome(strArr[1]);
					tabFuncionario.setSetor(strArr[2]);
					tabFuncionario.setCodFuncao(strArr[3]);
					tabFuncionario.setCoringa(strArr[4]);

					listTabFunc.add(tabFuncionario);
					
				}
			
				
				for (String linha : linhasArquivo) {
					
					System.out.println(linha + " ##### ");
					
//					String strArr[] = linha.split(";");
//
//					if (strArr.length == 4) {
//
//						tabFuncionario.setIdCliente(codCli);
//						tabFuncionario.setRegistro(strArr[0]);
//						tabFuncionario.setNome(strArr[1]);
//						tabFuncionario.setSetor(strArr[2]);
//						tabFuncionario.setCodFuncao(strArr[3]);
//						tabFuncionario.setCoringa(strArr[4]);
//
//						listTabFunc.add(tabFuncionario);

//					} else {
//						return msg = "400";
//					}

				}
				repository.saveAll(listTabFunc);

				msg = "200";
			} else {
				msg = "404";
			}

		} catch (IOException e) {

			e.printStackTrace();

			msg = "500";
		}
		return msg;
	}
	
	@Transactional
	@Modifying
	public void delete(Long id){
		repository.updateDelete(id, statusInativo);
	}

}
