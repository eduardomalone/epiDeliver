package com.epi.deliver.dto;

import java.io.Serializable;

import com.epi.deliver.entities.TabFuncXepi;


public class FuncXepi implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Long idFuncio;
	private Long idEpi;
	
	public FuncXepi() {
	}

	public FuncXepi(Long id, Long idFuncio, Long idEpi) {
		this.id = id;
		this.idFuncio = idFuncio;
		this.idEpi = idEpi;
	}

	public FuncXepi(TabFuncXepi entity) {
		id = entity.getId();
		idFuncio = entity.getIdFuncio();
		idEpi = entity.getIdEpi();
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

	
	
}
