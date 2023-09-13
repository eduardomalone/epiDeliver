package com.epi.deliver.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epi.deliver.dto.EpiDTO;
import com.epi.deliver.dto.FuncXepiDTO;
import com.epi.deliver.dto.FuncionarioDTO;
import com.epi.deliver.entities.TabEpi;
import com.epi.deliver.entities.TabFuncXepi;
import com.epi.deliver.entities.TabFuncionario;
import com.epi.deliver.mappers.EpiMapper;
import com.epi.deliver.repositories.EpiRepository;
import com.epi.deliver.repositories.FuncXepiRepository;
import com.epi.deliver.repositories.FuncionarioRepository;


@Service
public class EpiService {
	
	
	@Value("${status.variable.ativo}")
	private String status;
	
	@Value("${status.variable.inativo}")
	private String statusInativo;
	
	@Autowired
	private EpiRepository repository;
	
	

	@Transactional(readOnly = true)
	public List<EpiDTO>findAll(List<Long> ids){
		List<TabEpi> list = repository.findByIdIn(ids);
		//List<TabEpi> list = repository.findAll();
		return list.stream().map(x -> new EpiDTO(x)).collect(Collectors.toList());
		
	}
	
	@Transactional(readOnly = true)
	public List<EpiDTO>findAllIdCliente(Long idCliente){
		List<TabEpi> list = repository.findByIdClienteAndStatus(idCliente, status);
		return list.stream().map(x -> new EpiDTO(x)).collect(Collectors.toList());	
	}
	
	@Transactional(readOnly = true)
	public EpiDTO findId(Long id){
		Optional<TabEpi> list = repository.findById(id);
		return new EpiDTO(list.get());
	}
	
	@Transactional(readOnly = true)
	public List<EpiDTO> findByCodAndCliente(Long idCliente, String codEpi){
		List<TabEpi> list = repository.findByIdClienteAndCodigoAndStatus(idCliente, codEpi, status);
		return list.stream().map(x -> new EpiDTO(x)).collect(Collectors.toList());	
	}
	
	@Transactional(readOnly = true)
	public EpiDTO findIdEpi(Long idEpi){
		Optional<TabEpi> list = repository.findById(idEpi);
		return new EpiDTO(list.get());
	}
	
	@Transactional(readOnly = true)
	public List<EpiDTO> findByDescricao(Long idCliente, String descricao){
		List<TabEpi> list = repository.findByIdClienteAndStatusAndDescricaoContainingIgnoreCase(idCliente, status ,descricao);
		return list.stream().map(x -> new EpiDTO(x)).collect(Collectors.toList());	
	}
	
	@Transactional
	public EpiDTO save(EpiDTO epiDto){
		EpiMapper mapper = new EpiMapper();
		epiDto.setStatus(status);
		TabEpi epi = repository.save(mapper.convertEntity(epiDto));
		return new EpiDTO(epi);	
	}
	
	@Transactional
	@Modifying
	public void delete(Long id){
		repository.updateDelete(id, statusInativo);
	}
	
}
