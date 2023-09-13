package com.epi.deliver.dto;

import java.io.Serializable;

import com.epi.deliver.entities.TabEpi;

public class EpiDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Long idCliente;
	private String codigo;
	private String descricao;
	private String status;
	private int validade;
	
	
	public EpiDTO() {
	}


	public EpiDTO(Long id, Long idCliente, String codigo, String descricao, int validade, String status) {
		this.id = id;
		this.idCliente = idCliente;
		this.codigo = codigo;
		this.descricao = descricao;
		this.validade = validade;
		this.status = status;
	}


	public EpiDTO(TabEpi entity) {
		id = entity.getId();
		idCliente = entity.getIdCliente();
		codigo = entity.getCodigo();
		descricao = entity.getDescricao();
		validade = entity.getValidade();
		status = entity.getStatus();
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Long getIdCliente() {
		return idCliente;
	}


	public void setIdCliente(Long idCliente) {
		this.idCliente = idCliente;
	}


	public String getCodigo() {
		return codigo;
	}


	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}


	public String getDescricao() {
		return descricao;
	}


	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}


	public int getValidade() {
		return validade;
	}


	public void setValidade(int validade) {
		this.validade = validade;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}

		
}
