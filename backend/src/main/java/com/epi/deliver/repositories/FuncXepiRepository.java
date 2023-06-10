package com.epi.deliver.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epi.deliver.entities.TabFuncXepi;

public interface FuncXepiRepository  extends JpaRepository<TabFuncXepi, Long>{
	
	List<TabFuncXepi> findAll();
	
	Optional<TabFuncXepi> findById(Long id);
	
	List<TabFuncXepi> findByIdFuncio(Long id);
	
	List<TabFuncXepi> findByIdEpi(Long id);
	
}
