package com.epi.deliver.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epi.deliver.dto.FuncionarioDTO;
import com.epi.deliver.dto.LoginDTO;
import com.epi.deliver.dto.MontaTelaLoginDTO;

@Service
public class MontaTelaLoginService {
	
	@Autowired
	private FuncionarioService funcionarioService;
	
	@Autowired
	private LoginService loginService;
	
	
	public MontaTelaLoginDTO validaTelaLogin(String registro, String senha,Long idCliente) {
		
		MontaTelaLoginDTO montaTelaLoginDTO = new MontaTelaLoginDTO();
		FuncionarioDTO infoFuncio = new FuncionarioDTO();
		LoginDTO loginDTO = new LoginDTO();
		// busca IdFuncionario
		
		
		List<FuncionarioDTO> lista = new ArrayList<>();
		lista = funcionarioService.findFuncio(registro, idCliente);
		if(lista != null && !lista.isEmpty()) {
			infoFuncio = lista.get(0);
		}
		
		if(infoFuncio.getId() != null) {
			//busca funcionario na tabela de loggin
			loginDTO = loginService.findByIdFuncioLogin(infoFuncio.getId(), registro);
		}
		
		montaTelaLoginDTO.setFuncionario(infoFuncio);
		montaTelaLoginDTO.setLogin(loginDTO);
		
		return montaTelaLoginDTO;
	}

}
