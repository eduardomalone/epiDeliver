package com.epi.deliver.dto;

import java.io.Serializable;

import com.epi.deliver.entities.TabPerfil;



public class PerfilDTO implements Serializable{
	
private static final long serialVersionUID = 1L;
	
	private Long id;
	private String descricao;
	
	
	public PerfilDTO() {
	}
	
	
	public PerfilDTO(Long id, String descricao) {
		this.id = id;
		this.descricao = descricao;
	}
	
	public PerfilDTO(TabPerfil entity) {
		id = entity.getId();
		descricao = entity.getDescricao();
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getDescricao() {
		return descricao;
	}


	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}


}
