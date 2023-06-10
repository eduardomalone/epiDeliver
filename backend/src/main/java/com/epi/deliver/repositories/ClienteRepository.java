package com.epi.deliver.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epi.deliver.entities.TabCliente;
import com.epi.deliver.entities.TabEpi;

public interface ClienteRepository extends JpaRepository<TabCliente, Long>{
	
	List<TabCliente> findAllByOrderByNomeAsc();
	
	Optional<TabCliente> findById(Long id);

}
