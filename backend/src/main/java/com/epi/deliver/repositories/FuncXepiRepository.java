package com.epi.deliver.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.epi.deliver.entities.FuncXepiEntityDTO;
import com.epi.deliver.entities.TabFuncXepi;


@Repository
public interface FuncXepiRepository  extends JpaRepository<TabFuncXepi, Long>{
	
	List<TabFuncXepi> findAll();
	
	Optional<TabFuncXepi> findById(Long id);
	
	List<TabFuncXepi> findByIdFuncio(Long id);
	
	List<TabFuncXepi> findByIdEpi(Long id);
	
	TabFuncXepi save(TabFuncXepi tabFuncXepi);
	
	
	String queryUpdateDelete = "update tab_funcxepi x set x.status = ?2 where x.id = ?1";
	@Modifying(clearAutomatically = true)
	@Query(value = queryUpdateDelete, nativeQuery = true) 
	void updateDelete(Long id, String statusInativo);
	
	String query2= "select x.id as id, f.registro as registro, epi.codigo as codigo from tab_funcxepi x "
			+ "join tab_funcionario f "
			+ "on x.id_funcio = f.id "
			+ "join tab_epi epi "
			+ "on x.id_epi = epi.id "
			+ "where f.id_cliente = ?1 and x.status = ?2 and f.status = ?2";
	@Query(value = query2, nativeQuery = true) 
	List<FuncXepiEntityDTO> epiXfunc(Long idCli, String status);
	
	
	
	String query3 = "select x.id as id, f.registro as registro, epi.codigo as codigo from tab_funcxepi x "
			+ "join tab_funcionario f "
			+ "on x.id_funcio = f.id "
			+ "join dbepi.tab_epi epi "
			+ "on x.id_epi = epi.id "
			+ "where f.id_cliente = ?1 and (f.registro) like %?2% and x.status = ?3 and f.status = ?3";
	@Query(value = query3, nativeQuery = true) 
	List<FuncXepiEntityDTO> findRegistroEpiXfunc(Long idCli, String registro, String status);
	
	String query5 = "select x.id as id, f.registro as registro, epi.codigo as codigo from tab_funcxepi x "
			+ "join tab_funcionario f "
			+ "on x.id_funcio = f.id "
			+ "join dbepi.tab_epi epi "
			+ "on x.id_epi = epi.id "
			+ "where f.id_cliente = ?1 and (f.registro) = ?2 and x.status = ?3 and f.status = ?3";
	@Query(value = query5, nativeQuery = true) 
	List<FuncXepiEntityDTO> findByIdEpiXfuncDetalhe(Long idCli, String registro, String status);
	
	
	String query4 = "select x.id as id, f.registro as registro, epi.codigo as codigo from tab_funcxepi x "
			+ "join tab_funcionario f "
			+ "on x.id_funcio = f.id "
			+ "join dbepi.tab_epi epi "
			+ "on x.id_epi = epi.id "
			+ "where f.id_cliente = ?1 and x.id = ?2 and x.status = ?3 and f.status = ?3";
	@Query(value = query4, nativeQuery = true) 
	FuncXepiEntityDTO findByIdEpiXfunc(Long idCli, Long id, String status);
	
	
	
}
