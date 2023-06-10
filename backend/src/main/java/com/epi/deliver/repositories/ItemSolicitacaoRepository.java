package com.epi.deliver.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epi.deliver.entities.TabItemSolicitacao;

public interface ItemSolicitacaoRepository extends JpaRepository<TabItemSolicitacao, Long>{
	
	List<TabItemSolicitacao> findAll();
	
	Optional<TabItemSolicitacao> findByCodigoBarra(String codBarra);
	
	Optional<TabItemSolicitacao> findById(Long id);
	
	List<TabItemSolicitacao> findByIdSolicitacao(Long idSolicitacao);
	

}
