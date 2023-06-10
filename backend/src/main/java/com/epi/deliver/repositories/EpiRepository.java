package com.epi.deliver.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epi.deliver.entities.TabEpi;

public interface EpiRepository extends JpaRepository<TabEpi, Long>{
	
	List<TabEpi> findAll();
	
	List<TabEpi> findByIdIn(List<Long>ids);
	
	Optional<TabEpi> findById(Long id);
	
	Optional<TabEpi> findByCodigo(String codigo);
	

}
