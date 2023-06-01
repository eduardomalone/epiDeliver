package com.epi.deliver.dto;

import java.io.Serializable;

import com.epi.deliver.entities.TabCliente;

public class ClienteDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	
	private Long id;
	private String nome;
	private String  video;
	
	public ClienteDTO() {}

	public ClienteDTO(Long id, String nome, String video) {
		this.id = id;
		this.nome = nome;
		this.video = video;
	}
	
	public ClienteDTO(TabCliente entity) {
		id = entity.getId();
		nome = entity.getNome();
		video = entity.getVideo();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getVideo() {
		return video;
	}

	public void setVideo(String video) {
		this.video = video;
	}
	
	
}
