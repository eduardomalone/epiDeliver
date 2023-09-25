package com.epi.deliver.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.epi.deliver.dto.FuncionarioDTO;
import com.epi.deliver.entities.TabFuncionario;

public interface FuncionarioRepository extends JpaRepository<TabFuncionario, Long>{
	
	List<TabFuncionario> findAll();
	
	List<TabFuncionario> findByStatusOrderByNomeAsc(String status);
	
	List<TabFuncionario> findByRegistroAndIdClienteAndStatus(String registro, Long idCliente, String status);
	
	Optional<TabFuncionario> findById(Long id);
	
	Optional<TabFuncionario> findByRegistroAndStatus(String regisdtro, String status);
	
	List<TabFuncionario> findByIdClienteAndStatus(Long idCliente, String status);
	
	List<TabFuncionario> findByIdAndIdClienteAndStatus(Long id, Long idCliente, String status);
	
	List<TabFuncionario> findByNomeContainingIgnoreCaseAndIdClienteAndStatus(String nome, Long idCliente, String status);
	
	TabFuncionario save (FuncionarioDTO funcionario);
	

	String queryUpdateDelete = "update tab_funcionario x set x.status = ?2 where x.id = ?1";
	@Modifying(clearAutomatically = true)
	@Query(value = queryUpdateDelete, nativeQuery = true) 
	void updateDelete(Long id, String statusInativo);
	
	
}
