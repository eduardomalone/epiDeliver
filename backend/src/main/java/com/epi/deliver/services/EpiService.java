package com.epi.deliver.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epi.deliver.dto.EpiDTO;
import com.epi.deliver.dto.FuncXepiDTO;
import com.epi.deliver.dto.FuncionarioDTO;
import com.epi.deliver.entities.TabEpi;
import com.epi.deliver.entities.TabFuncXepi;
import com.epi.deliver.entities.TabFuncionario;
import com.epi.deliver.repositories.EpiRepository;
import com.epi.deliver.repositories.FuncXepiRepository;
import com.epi.deliver.repositories.FuncionarioRepository;


@Service
public class EpiService {
	
	@Autowired
	private EpiRepository repository;

	@Transactional(readOnly = true)
	public List<EpiDTO>findAll(List<Long> ids){
		List<TabEpi> list = repository.findByIdIn(ids);
		//List<TabEpi> list = repository.findAll();
		return list.stream().map(x -> new EpiDTO(x)).collect(Collectors.toList());
		
	}
	
	@Transactional(readOnly = true)
	public List<EpiDTO>findAllIdCliente(Long inCliente){
		List<TabEpi> list = repository.findByIdCliente(inCliente);
		return list.stream().map(x -> new EpiDTO(x)).collect(Collectors.toList());
		
	}

}
