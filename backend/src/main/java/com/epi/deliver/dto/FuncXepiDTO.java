package com.epi.deliver.dto;

import java.io.Serializable;

import com.epi.deliver.entities.TabFuncXepi;


public class FuncXepiDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Long idFuncio;
	private Long idEpi;
	private String status;
	
	public FuncXepiDTO() {
	}

	public FuncXepiDTO(Long id, Long idFuncio, Long idEpi, String status) {
		this.id = id;
		this.idFuncio = idFuncio;
		this.idEpi = idEpi;
		this.setStatus(status);
	}

	public FuncXepiDTO(TabFuncXepi entity) {
		id = entity.getId();
		idFuncio = entity.getIdFuncio();
		idEpi = entity.getIdEpi();
		setStatus(entity.getStatus());
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

	public Long getIdEpi() {
		return idEpi;
	}

	public void setIdEpi(Long idEpi) {
		this.idEpi = idEpi;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
	
}
