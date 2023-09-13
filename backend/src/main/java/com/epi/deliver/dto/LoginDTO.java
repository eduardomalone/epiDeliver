package com.epi.deliver.dto;

import java.io.Serializable;

import javax.persistence.Id;

import com.epi.deliver.entities.TabLogin;
import com.fasterxml.jackson.annotation.JsonProperty;


public class LoginDTO  implements Serializable {
	
	
	private static final long serialVersionUID = 1L;
	
	@Id
	private Long id;
	private Long idPerfil;
	private Long idFuncio;
	private String login;
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String senha;
	
	
	public LoginDTO() {
		
	}
	
	
	public LoginDTO(Long id, Long idPerfil, Long idFuncio, String login, String senha) {
		
		this.id = id;
		this.idPerfil = idPerfil;
		this.idFuncio = idFuncio;
		this.login = login;
		this.senha = senha;
	}
	
	public LoginDTO(TabLogin entity) {
		
		this.id = entity.getId();
		this.idPerfil = entity.getIdPerfil();
		this.idFuncio = entity.getIdFuncio();
		this.login = entity.getLogin();
		this.senha = entity.getSenha();
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Long getIdPerfil() {
		return idPerfil;
	}


	public void setIdPerfil(Long idPerfil) {
		this.idPerfil = idPerfil;
	}


	public Long getIdFuncio() {
		return idFuncio;
	}


	public void setIdFuncio(Long idFuncio) {
		this.idFuncio = idFuncio;
	}


	public String getLogin() {
		return login;
	}


	public void setLogin(String login) {
		this.login = login;
	}


	public String getSenha() {
		return senha;
	}


	public void setSenha(String senha) {
		this.senha = senha;
	}
	
}
