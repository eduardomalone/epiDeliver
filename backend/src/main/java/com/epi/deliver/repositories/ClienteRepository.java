package com.epi.deliver.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epi.deliver.entities.TabCliente;

public interface ClienteRepository extends JpaRepository<TabCliente, Long>{
	
	List<TabCliente> findAllByOrderByNomeAsc();

}
