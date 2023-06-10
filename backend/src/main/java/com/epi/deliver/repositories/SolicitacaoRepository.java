package com.epi.deliver.repositories;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.epi.deliver.entities.TabSoliciatacao;

public interface SolicitacaoRepository extends JpaRepository<TabSoliciatacao, Long>{

	
	Optional<TabSoliciatacao> findById(Long id);
	Optional<TabSoliciatacao> findByIdFuncio(Long id);
	
}
