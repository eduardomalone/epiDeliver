package com.epi.deliver.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tab_funcionario")
public class TabFuncionario implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long idCliente;
	private String registro;
	private String nome;
	private String setor;
	private String codFuncao;
	private String coringa;
	
	
	public TabFuncionario(Long id, Long idCliente, String registro, String nome, String setor, String codFuncao,
			String coringa) {
		this.id = id;
		this.idCliente = idCliente;
		this.registro = registro;
		this.nome = nome;
		this.setor = setor;
		this.codFuncao = codFuncao;
		this.coringa = coringa;
	}


	public TabFuncionario() {
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TabFuncionario other = (TabFuncionario) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
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
