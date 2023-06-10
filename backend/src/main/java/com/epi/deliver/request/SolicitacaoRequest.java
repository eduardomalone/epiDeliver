package com.epi.deliver.request;

import java.util.List;

import com.epi.deliver.dto.EpiDTO;
import com.epi.deliver.dto.FuncionarioDTO;

public class SolicitacaoRequest {

	FuncionarioDTO funcionarioDTO;
	List<EpiDTO> listaEpiDTO;
	
	
	public FuncionarioDTO getFuncionarioDTO() {
		return funcionarioDTO;
	}
	public void setFuncionarioDTO(FuncionarioDTO funcionarioDTO) {
		this.funcionarioDTO = funcionarioDTO;
	}
	public List<EpiDTO> getListaEpiDTO() {
		return listaEpiDTO;
	}
	public void setListaEpiDTO(List<EpiDTO> listaEpiDTO) {
		this.listaEpiDTO = listaEpiDTO;
	}
	
	
}
