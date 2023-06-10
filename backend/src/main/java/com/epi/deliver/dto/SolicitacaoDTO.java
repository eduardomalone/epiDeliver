package com.epi.deliver.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.epi.deliver.entities.TabSoliciatacao;

public class SolicitacaoDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Long idFuncio;
	private Date data;
	
	
	public SolicitacaoDTO() {
	}

	public SolicitacaoDTO(Long id, Long idFuncio, Date data) {
		this.id = id;
		this.idFuncio = idFuncio;
		this.data = data;
	}	
	
	public SolicitacaoDTO(TabSoliciatacao entity) {
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

	public Date getData() {
		return data;
	}

	public void setData(Date date) {
		this.data = date;
	}
	

}
