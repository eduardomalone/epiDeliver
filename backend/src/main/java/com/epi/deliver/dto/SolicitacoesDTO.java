package com.epi.deliver.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.epi.deliver.entities.TabSoliciatacao;

public class SolicitacoesDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Long idFuncio;
	private LocalDateTime data;
	
	
	public SolicitacoesDTO() {
	}

	public SolicitacoesDTO(Long id, Long idFuncio, LocalDateTime data) {
		this.id = id;
		this.idFuncio = idFuncio;
		this.data = data;
	}	
	
	public SolicitacoesDTO(TabSoliciatacao entity) {
		id = entity.getId();
		idFuncio = entity.getIdFuncio();
		data = entity.getData();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdFuncio() {
		return idFuncio;
	}

	public void setIdFuncio(Long idFuncio) {
		this.idFuncio = idFuncio;
	}

	public LocalDateTime getData() {
		return data;
	}

	public void setData(LocalDateTime data) {
		this.data = data;
	}
	

}
