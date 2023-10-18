package com.epi.deliver.dto;

import java.io.Serializable;

import com.epi.deliver.entities.TabCliente;

public class RelatorioDatasDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	
	private String dataInclusao;
	private String registro;
	private String  setor;
	private String  codigo;
	
	
	
	public String getDataInclusao() {
		return dataInclusao;
	}
	public void setDataInclusao(String dataInclusao) {
		this.dataInclusao = dataInclusao;
	}
	public String getRegistro() {
		return registro;
	}
	public void setRegistro(String registro) {
		this.registro = registro;
	}
	public String getSetor() {
		return setor;
	}
	public void setSetor(String setor) {
		this.setor = setor;
	}
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	
	
}