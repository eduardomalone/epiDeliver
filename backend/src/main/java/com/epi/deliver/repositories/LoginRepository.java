package com.epi.deliver.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epi.deliver.entities.TabLogin;

public interface LoginRepository extends JpaRepository<TabLogin, Long>{
	
	List<TabLogin> findAll();
	
	Optional<TabLogin> findByLogin(String login);
	
	Optional<TabLogin> findById(Long id);

}
