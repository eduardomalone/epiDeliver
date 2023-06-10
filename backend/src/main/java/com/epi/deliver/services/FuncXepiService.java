package com.epi.deliver.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epi.deliver.dto.FuncXepiDTO;
import com.epi.deliver.dto.FuncionarioDTO;
import com.epi.deliver.entities.TabFuncXepi;
import com.epi.deliver.entities.TabFuncionario;
import com.epi.deliver.repositories.FuncXepiRepository;
import com.epi.deliver.repositories.FuncionarioRepository;


@Service
public class FuncXepiService {
	
	@Autowired
	private FuncXepiRepository repository;

	@Transactional(readOnly = true)
	public List<FuncXepiDTO>findByIdFuncio(Long idFuncio){
		List<TabFuncXepi> list = repository.findByIdFuncio(idFuncio);
		return list.stream().map(x -> new FuncXepiDTO(x)).collect(Collectors.toList());
		
	}

}
