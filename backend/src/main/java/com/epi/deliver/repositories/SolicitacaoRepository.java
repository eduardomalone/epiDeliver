package com.epi.deliver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epi.deliver.entities.TabCliente;

public interface SolicitacaoRepository extends JpaRepository<TabCliente, Long>{

}
