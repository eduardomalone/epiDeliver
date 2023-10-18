package com.epi.deliver.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epi.deliver.dto.ClienteDTO;
import com.epi.deliver.entities.FuncXepiEntityDTO;
import com.epi.deliver.entities.RelatorioDatasBaixaEntityDTO;
import com.epi.deliver.entities.RelatorioDatasEntityDTO;
import com.epi.deliver.entities.TabCliente;
import com.epi.deliver.repositories.ClienteRepository;
import com.epi.deliver.repositories.RelatorioRepository;

@Service
public class RelatorioService {
	
	@Autowired
	private RelatorioRepository repository;

//	@Transactional(readOnly = true)
//	public List<ClienteDTO> findAll(){
//		List<TabCliente> list = repository.findAllByOrderByNomeAsc();
//		return list.stream().map(x -> new ClienteDTO(x)).collect(Collectors.toList());
//	}
	
	@Transactional(readOnly = true)
	public List<RelatorioDatasEntityDTO>findRelatorioDatas(String data1, String data2, Long idCli){
		List<RelatorioDatasEntityDTO> list = repository.findRelatorioDatas(data1, data2, idCli);
		return list;
	}
	
	@Transactional(readOnly = true)
	public List<RelatorioDatasBaixaEntityDTO>findRelatorioDatasBaixa(String data1, String data2, Long idCli){
		List<RelatorioDatasBaixaEntityDTO> list = repository.findRelatorioDatasBaixa(data1, data2, idCli);
		return list;
	}
	
	@Transactional(readOnly = true)
	public List<RelatorioDatasBaixaEntityDTO>findRelatorioDatasBaixaFunc(String registro, Long idCli){
		List<RelatorioDatasBaixaEntityDTO> list = repository.findRelatorioDatasBaixaFunc(registro, idCli);
		return list;
	}
}
