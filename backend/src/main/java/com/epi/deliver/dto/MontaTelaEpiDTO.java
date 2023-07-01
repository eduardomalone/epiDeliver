package com.epi.deliver.dto;

import java.util.List;

public class MontaTelaEpiDTO {
	
	private List<FuncionarioDTO> funcionarioDTO;
	private List<EpiDTO> listaEpiDTO;
	
	
	public MontaTelaEpiDTO() {
	}
	
	
	public MontaTelaEpiDTO(List<FuncionarioDTO> funcionarioDTO, List<EpiDTO> listaEpiDTO) {
		this.funcionarioDTO = funcionarioDTO;
		this.listaEpiDTO = listaEpiDTO;
	}

	
	public List<FuncionarioDTO> getFuncionarioDTO() {
		return funcionarioDTO;
	}
	public void setFuncionarioDTO(List<FuncionarioDTO> funcionarioDTO) {
		this.funcionarioDTO = funcionarioDTO;
	}
	public List<EpiDTO> getListaEpiDTO() {
		return listaEpiDTO;
	}
	public void setListaEpiDTO(List<EpiDTO> listaEpiDTO) {
		this.listaEpiDTO = listaEpiDTO;
	}

	
}
