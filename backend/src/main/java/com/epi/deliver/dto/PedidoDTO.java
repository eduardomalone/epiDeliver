package com.epi.deliver.dto;

import java.util.List;

public class PedidoDTO {
	
	private FuncionarioDTO funcionarioDTO;
	private SolicitacaoDTO solicitacaoDTO;
	private List<ItemSolicitacaoDTO> itemSolicitacaoList;
	
	
	public List<ItemSolicitacaoDTO> getItemSolicitacaoList() {
		return itemSolicitacaoList;
	}
	public void setItemSolicitacaoList(List<ItemSolicitacaoDTO> itemSolicitacaoList) {
		this.itemSolicitacaoList = itemSolicitacaoList;
	}
	public SolicitacaoDTO getSolicitacaoDTO() {
		return solicitacaoDTO;
	}
	public void setSolicitacaoDTO(SolicitacaoDTO solicitacaoDTO) {
		this.solicitacaoDTO = solicitacaoDTO;
	}

	public FuncionarioDTO getFuncionarioDTO() {
		return funcionarioDTO;
	}
	public void setFuncionarioDTO(FuncionarioDTO funcionarioDTO) {
		this.funcionarioDTO = funcionarioDTO;
	}
	
	

}
