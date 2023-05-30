package com.epi.deliver.entities;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tab_item_solicitacao")
public class TabItemSolicitacao implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long idSolicitacao;
	private Long idEpi;
	private String codigoBarra;
	private LocalDateTime dataInclusao;
	private Long idUsuarioBaixa;
	private String ip;
	private LocalDateTime dataBaixa;
	
	
	public TabItemSolicitacao() {
	}


	public TabItemSolicitacao(Long id, Long idSolicitacao, Long idEpi, String codigoBarra, LocalDateTime dataInclusao,
			Long idUsuarioBaixa, String ip, LocalDateTime dataBaixa) {
		this.id = id;
		this.idSolicitacao = idSolicitacao;
		this.idEpi = idEpi;
		this.codigoBarra = codigoBarra;
		this.dataInclusao = dataInclusao;
		this.idUsuarioBaixa = idUsuarioBaixa;
		this.ip = ip;
		this.dataBaixa = dataBaixa;
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
		TabItemSolicitacao other = (TabItemSolicitacao) obj;
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


	public Long getIdSolicitacao() {
		return idSolicitacao;
	}


	public void setIdSolicitacao(Long idSolicitacao) {
		this.idSolicitacao = idSolicitacao;
	}


	public Long getIdEpi() {
		return idEpi;
	}


	public void setIdEpi(Long idEpi) {
		this.idEpi = idEpi;
	}


	public String getCodigoBarra() {
		return codigoBarra;
	}


	public void setCodigoBarra(String codigoBarra) {
		this.codigoBarra = codigoBarra;
	}


	public LocalDateTime getDataInclusao() {
		return dataInclusao;
	}


	public void setDataInclusao(LocalDateTime dataInclusao) {
		this.dataInclusao = dataInclusao;
	}


	public Long getIdUsuarioBaixa() {
		return idUsuarioBaixa;
	}


	public void setIdUsuarioBaixa(Long idUsuarioBaixa) {
		this.idUsuarioBaixa = idUsuarioBaixa;
	}


	public String getIp() {
		return ip;
	}


	public void setIp(String ip) {
		this.ip = ip;
	}


	public LocalDateTime getDataBaixa() {
		return dataBaixa;
	}


	public void setDataBaixa(LocalDateTime dataBaixa) {
		this.dataBaixa = dataBaixa;
	}
	
	

}
