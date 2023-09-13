package com.epi.deliver.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epi.deliver.dto.AtualizaSenhaDTORequest;
import com.epi.deliver.dto.LoginDTO;
import com.epi.deliver.entities.TabFuncionario;
import com.epi.deliver.entities.TabLogin;
import com.epi.deliver.repositories.FuncionarioRepository;
import com.epi.deliver.repositories.LoginRepository;

@Service
public class LoginService {
	

	@Value("${status.variable.ativo}")
	private String status;
	
	@Autowired
	private LoginRepository repository;
	
	@Autowired
	private FuncionarioRepository repositoryFunc;
	
	
	//private LogginMapper logginMapper;
	
	@Autowired
	private final PasswordEncoder encoder;
	
	
	

	public LoginService(LoginRepository repository, FuncionarioRepository repositoryFunc,
			PasswordEncoder encoder) {
		this.repository = repository;
		this.repositoryFunc = repositoryFunc;
		//this.logginMapper = logginMapper;
		this.encoder = encoder;
	}

	@Transactional(readOnly = true)
	public LoginDTO findByLogin(String login){
		Optional<TabLogin> tabLogin = repository.findByLogin(login);
		if(tabLogin == null || tabLogin.isEmpty()) {
			return new LoginDTO();
		}else {
			return new LoginDTO(tabLogin.get());			
		}
		//return logginMapper.convertDTO(tabLogin.get());
	}
	
	@Transactional(readOnly = true)
	public LoginDTO findByIdFuncioLogin(Long idFuncio, String login){
		Optional<TabLogin> tabLogin = repository.findByIdFuncioAndLogin(idFuncio, login);
		if(tabLogin == null || tabLogin.isEmpty()) {
			return new LoginDTO();
		}else {
			return new LoginDTO(tabLogin.get());			
		}
		//return logginMapper.convertDTO(tabLogin.get());
	}
	
	@Transactional
	public LoginDTO save(LoginDTO loginDTO){
		TabLogin login = new TabLogin(loginDTO.getId(), loginDTO.getIdPerfil(), loginDTO.getIdFuncio(), loginDTO.getLogin(), loginDTO.getSenha());
		login = repository.save(login);
		return new LoginDTO(login);
	}
	
	@Transactional
	public LoginDTO cadastrarSenha(LoginDTO loginDTO){
		Optional<TabLogin> func = repository.findByLogin(loginDTO.getLogin());
		
		if(func == null || func.isEmpty()) {
			return new LoginDTO();
		}
		//loginnew LoginDTO(func.get());
		//loginDTO.setIdPerfil(func.get(0).get);
		func.get().setSenha(loginDTO.getSenha());
		//TabLogin login = new TabLogin( loginDTO.getIdFuncio(), loginDTO.getLogin(), loginDTO.getSenha());
		TabLogin login = repository.save(func.get());
		return new LoginDTO(login);
	}
	
	@Transactional(readOnly = true)
	public List<LoginDTO> findAll(){
		List<TabLogin> list = repository.findAll();
		return list.stream().map(x -> new LoginDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional
	public LoginDTO atualizarSenha(AtualizaSenhaDTORequest atualizaSenhaDTO){
		
		List<TabFuncionario>listaFunc = repositoryFunc.findByRegistroAndIdClienteAndStatus(atualizaSenhaDTO.getLogin(), atualizaSenhaDTO.getIdCliente(), status);
		
		if(listaFunc == null || listaFunc.isEmpty()) {
			return new LoginDTO();
		}
		
		
		Optional<TabLogin> func = repository.findByIdFuncioAndLogin(listaFunc.get(0).getId(), atualizaSenhaDTO.getLogin());
		
		if(func == null || func.isEmpty()) {
			return new LoginDTO();
		}
		
		boolean valid = encoder.matches(atualizaSenhaDTO.getSenha(), func.get().getSenha());
		
		TabLogin login = new TabLogin();
		if(valid) {
			func.get().setSenha(encoder.encode(atualizaSenhaDTO.getNovaSenha()));
			login = repository.save(func.get());
		}
		return new LoginDTO(login);
	}


}
