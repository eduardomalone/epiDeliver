package com.epi.deliver.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.epi.deliver.entities.TabEpi;

public interface EpiRepository extends JpaRepository<TabEpi, Long>{
	
	List<TabEpi> findAll();
	
	List<TabEpi> findByIdIn(List<Long>ids);
	
	List<TabEpi> findByIdClienteAndStatus(Long id, String status);
	
	Optional<TabEpi> findByIdAndStatus(Long id, String status);
	
	Optional<TabEpi> findByCodigoAndStatus(String codigo, String status);

	List<TabEpi> findByIdClienteAndCodigoAndStatus(Long idCliente, String codigo, String status);
	
	List<TabEpi> findByDescricaoContainingIgnoreCaseAndIdClienteAndStatus(String descricao, Long idCliente, String status);
	
	List<TabEpi> findByIdClienteAndStatusAndDescricaoContainingIgnoreCase(Long idCliente, String status,String descricao);
	
	TabEpi save(TabEpi tabEpi);
	
	String queryUpdateDelete = "update tab_epi x set x.status = ?2 where x.id = ?1";
	@Modifying(clearAutomatically = true)
	@Query(value = queryUpdateDelete, nativeQuery = true) 
	void updateDelete(Long id, String statusInativo);
	

}
