package com.epi.deliver.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epi.deliver.entities.TabPerfil;

public interface PerfilRepository extends JpaRepository<TabPerfil, Long>{
	
	List<TabPerfil> findAll();
	
	Optional<TabPerfil> findByDescricao(String desc);
	
	Optional<TabPerfil> findById(Long id);

}
