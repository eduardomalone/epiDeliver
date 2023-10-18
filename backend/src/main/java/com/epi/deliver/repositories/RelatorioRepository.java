package com.epi.deliver.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.epi.deliver.entities.FuncXepiEntityDTO;
import com.epi.deliver.entities.RelatorioDatasBaixaEntityDTO;
import com.epi.deliver.entities.RelatorioDatasEntityDTO;
import com.epi.deliver.entities.TabCliente;
import com.epi.deliver.entities.TabEpi;

public interface RelatorioRepository extends JpaRepository<TabCliente, Long>{
		
	
	String query= "SELECT item.data_inclusao as dataInclusao, func.registro as registro, func.setor as setor, epi.codigo as codigo "
			+ "FROM tab_item_solicitacao item "
			+ "join tab_solicitacao sol "
			+ "on item.id_solicitacao = sol.id "
			+ "join tab_funcionario func "
			+ "on sol.id_funcio = func.id "
			+ "join tab_epi epi "
			+ "on item.id_epi = epi.id "
			+ "where func.id_cliente = :idCli AND sol.data BETWEEN :data1 AND :data2";
	@Query(value = query, nativeQuery = true) 
	List<RelatorioDatasEntityDTO> findRelatorioDatas(String data1, String data2, Long idCli);
	
	
	String query2= "SELECT item.data_inclusao as dataInclusao, func.nome as nome, epi.codigo as codigo, epi.descricao as descricao, item.data_baixa as dataBaixa "
			+ "FROM tab_item_solicitacao item "
			+ "join tab_solicitacao sol "
			+ "on item.id_solicitacao = sol.id "
			+ "join tab_funcionario func "
			+ "on sol.id_funcio = func.id "
			+ "join tab_epi epi "
			+ "on item.id_epi = epi.id "
			+ "where func.id_cliente = :idCli AND sol.data BETWEEN :data1 AND :data2";
	@Query(value = query2, nativeQuery = true) 
	List<RelatorioDatasBaixaEntityDTO> findRelatorioDatasBaixa(String data1, String data2, Long idCli);
	
	
	String query3= "SELECT item.data_inclusao as dataInclusao, func.nome as nome, epi.codigo as codigo, epi.descricao as descricao, item.data_baixa as dataBaixa "
			+ "FROM tab_item_solicitacao item "
			+ "join tab_solicitacao sol "
			+ "on item.id_solicitacao = sol.id "
			+ "join tab_funcionario func "
			+ "on sol.id_funcio = func.id "
			+ "join tab_epi epi "
			+ "on item.id_epi = epi.id "
			+ "where func.id_cliente = ?2 and func.registro = ?1";
	@Query(value = query3, nativeQuery = true) 
	List<RelatorioDatasBaixaEntityDTO> findRelatorioDatasBaixaFunc(String registro, Long idCli);
	
		
}
