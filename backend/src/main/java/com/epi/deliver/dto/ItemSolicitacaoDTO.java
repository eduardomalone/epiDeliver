package com.epi.deliver.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

import com.epi.deliver.entities.TabItemSolicitacao;


public class ItemSolicitacaoDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Long idSolicitacao;
	private Long idEpi;
	private String codigoBarra;
	private Date dataInclusao;
	private Long idUsuarioBaixa;
	private String ip;
	private Date dataBaixa;
	
	
	public ItemSolicitacaoDTO() {
	}


	public ItemSolicitacaoDTO(Long id, Long idSolicitacao, Long idEpi, String codigoBarra, Date dataInclusao,
			Long idUsuarioBaixa, String ip, Date dataBaixa) {
		this.id = id;
		this.idSolicitacao = idSolicitacao;
		this.idEpi = idEpi;
		this.codigoBarra = codigoBarra;
		this.dataInclusao = dataInclusao;
		this.idUsuarioBaixa = idUsuarioBaixa;
		this.ip = ip;
		this.dataBaixa = dataBaixa;
	}
	
	
	public ItemSolicitacaoDTO(TabItemSolicitacao entity) {
		id = entity.getId();
		idSolicitacao = entity.getIdSolicitacao();
		idEpi = entity.getIdEpi();
		codigoBarra = entity.getCodigoBarra();
		dataInclusao = entity.getDataInclusao();
		idUsuarioBaixa = entity.getIdUsuarioBaixa();
		ip = entity.getIp();
		dataBaixa = entity.getDataBaixa();
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


	public Date getDataInclusao() {
		return dataInclusao;
	}


	public void setDataInclusao(Date dataInclusao) {
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


	public Date getDataBaixa() {
		return dataBaixa;
	}


	public void setDataBaixa(Date dataBaixa) {
		this.dataBaixa = dataBaixa;
	}
	

}
