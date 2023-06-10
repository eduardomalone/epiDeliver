package com.epi.deliver.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epi.deliver.entities.TabFuncionario;

public interface FuncionarioRepository extends JpaRepository<TabFuncionario, Long>{
	
	List<TabFuncionario> findAll();
	
	List<TabFuncionario> findAllByOrderByNomeAsc();
	
	List<TabFuncionario> findByRegistroAndIdCliente(String registro, Long idCliente);
	
	Optional<TabFuncionario> findById(Long id);
	
	Optional<TabFuncionario> findByRegistro(String regisdtro);

}
