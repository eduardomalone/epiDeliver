package com.epi.deliver.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epi.deliver.dto.FuncXepiDTO;
import com.epi.deliver.dto.FuncionarioDTO;
import com.epi.deliver.dto.MontaTelaEpiDTO;

@Service
public class MontaTelaEpiService {

	@Autowired
	private FuncionarioService funcionarioService;
	
	@Autowired
	private FuncXepiService funcXepiService;
	
	@Autowired
	private EpiService epiService;
	
	public MontaTelaEpiDTO montaTelaEpi(String registro, Long idCliente) {
		
		MontaTelaEpiDTO montaTelaEpiDTO = new MontaTelaEpiDTO();
		List<FuncionarioDTO> lista = funcionarioService.findFuncio(registro, idCliente);
		montaTelaEpiDTO.setFuncionarioDTO(lista.get(0));
		
		List<FuncXepiDTO> listaFuncXepi = funcXepiService.findByIdFuncio(montaTelaEpiDTO.getFuncionarioDTO().getId());
		ArrayList<Long> listaIdEpi = new ArrayList<>();
		for (FuncXepiDTO i : listaFuncXepi) {
			listaIdEpi.add(i.getIdEpi());
			}
		montaTelaEpiDTO.setListaEpiDTO(epiService.findAll(listaIdEpi));
		return montaTelaEpiDTO;
	}
	



}
