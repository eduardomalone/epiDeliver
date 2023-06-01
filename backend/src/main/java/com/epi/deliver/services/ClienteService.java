package com.epi.deliver.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epi.deliver.dto.ClienteDTO;
import com.epi.deliver.entities.TabCliente;
import com.epi.deliver.repositories.ClienteRepository;

@Service
public class ClienteService {
	
	@Autowired
	private ClienteRepository repository;

	@Transactional(readOnly = true)
	public List<ClienteDTO> findAll(){
		List<TabCliente> list = repository.findAllByOrderByNomeAsc();
		return list.stream().map(x -> new ClienteDTO(x)).collect(Collectors.toList());
		
	}
}
