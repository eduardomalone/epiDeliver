package com.epi.deliver.dto;

import java.io.Serializable;


import com.epi.deliver.entities.TabFuncionario;

public class FuncionarioDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Long idCliente;
	private String registro;
	private String nome;
	private String setor;
	private String codFuncao;
	private String coringa;
	
	
	public FuncionarioDTO(Long id, Long idCliente, String registro, String nome, String setor, String codFuncao,
			String coringa) {
		this.id = id;
		this.idCliente = idCliente;
		this.registro = registro;
		this.nome = nome;
		this.setor = setor;
		this.codFuncao = codFuncao;
		this.coringa = coringa;
	}

	public FuncionarioDTO(TabFuncionario entity) {
		id = entity.getId();
		idCliente = entity.getIdCliente();
		registro = entity.getRegistro();
		nome = entity.getNome();
		setor = entity.getSetor();
		codFuncao = entity.getCodFuncao();
		coringa = entity.getCoringa();
	}

	public FuncionarioDTO() {
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

	public String getRegistro() {
		return registro;
	}

	public void setRegistro(String registro) {
		this.registro = registro;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSetor() {
		return setor;
	}

	public void setSetor(String setor) {
		this.setor = setor;
	}

	public String getCodFuncao() {
		return codFuncao;
	}

	public void setCodFuncao(String codFuncao) {
		this.codFuncao = codFuncao;
	}

	public String getCoringa() {
		return coringa;
	}

	public void setCoringa(String coringa) {
		this.coringa = coringa;
	}


}
