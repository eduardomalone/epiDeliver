package com.epi.deliver.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epi.deliver.dto.FuncXepiDTO;
import com.epi.deliver.entities.FuncXepiEntityDTO;
import com.epi.deliver.entities.TabFuncXepi;
import com.epi.deliver.mappers.FuncXepiMapper;
import com.epi.deliver.repositories.FuncXepiRepository;


@Service
public class FuncXepiService {
	

	@Value("${status.variable.ativo}")
	private String status;
	
	

	@Value("${status.variable.inativo}")
	private String statusInativo;
	
	
	@Autowired
	private FuncXepiRepository repository;

	@Transactional(readOnly = true)
	public List<FuncXepiDTO>findByIdFuncio(Long idFuncio){
		List<TabFuncXepi> list = repository.findByIdFuncio(idFuncio);
		return list.stream().map(x -> new FuncXepiDTO(x)).collect(Collectors.toList());
	}
	
	
	@Transactional(readOnly = true)
	public List<FuncXepiEntityDTO>epiXfunc(Long idCli){
		List<FuncXepiEntityDTO> list = repository.epiXfunc(idCli, "1");
		return list;
	}
	
	
	@Transactional(readOnly = true)
	public List<FuncXepiEntityDTO>findRegistroEpiXfunc(Long idCli, String registro){
		List<FuncXepiEntityDTO> list = repository.findRegistroEpiXfunc(idCli, registro, "1");
		return list;
	}
	
	@Transactional(readOnly = true)
	public List<FuncXepiEntityDTO>findByIdEpiXfuncDetalhe(Long idCli, String registro){
		List<FuncXepiEntityDTO> list = repository.findByIdEpiXfuncDetalhe(idCli, registro, "1");
		return list;
	}
	

	@Transactional(readOnly = true)
	public FuncXepiEntityDTO findByIdEpiXfunc(Long idCli, Long id){
		FuncXepiEntityDTO list = repository.findByIdEpiXfunc(idCli, id, "1");
		return list;
	}
	
	
	@Transactional
	public FuncXepiDTO save(FuncXepiDTO request){
		FuncXepiMapper mapper = new FuncXepiMapper();
		request.setStatus(status);
		TabFuncXepi list = repository.save(mapper.convertEntity(request));
		return new FuncXepiDTO(list);
	}
	
	
	@Transactional
	@Modifying
	public void delete(Long id){
		repository.updateDelete(id, statusInativo);
	}

}
