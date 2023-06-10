package com.epi.deliver.dto;

import java.util.List;

public class MontaTelaEpiDTO {
	
	private FuncionarioDTO funcionarioDTO;
	private List<EpiDTO> listaEpiDTO;
	
	
	public MontaTelaEpiDTO() {
	}
	
	
	public MontaTelaEpiDTO(FuncionarioDTO funcionarioDTO, List<EpiDTO> listaEpiDTO) {
		this.funcionarioDTO = funcionarioDTO;
		this.listaEpiDTO = listaEpiDTO;
	}

	
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
