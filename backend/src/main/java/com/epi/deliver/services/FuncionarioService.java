package com.epi.deliver.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epi.deliver.dto.FuncionarioDTO;
import com.epi.deliver.entities.TabFuncionario;
import com.epi.deliver.repositories.FuncionarioRepository;


@Service
public class FuncionarioService {
	
	@Autowired
	private FuncionarioRepository repository;

	@Transactional(readOnly = true)
	public List<FuncionarioDTO>findFuncio(String registro, Long idCliente){
		List<TabFuncionario> list = repository.findByRegistroAndIdCliente(registro, idCliente);
		return list.stream().map(x -> new FuncionarioDTO(x)).collect(Collectors.toList());
		
	}

}
