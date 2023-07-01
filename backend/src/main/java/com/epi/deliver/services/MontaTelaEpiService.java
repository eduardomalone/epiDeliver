package com.epi.deliver.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epi.deliver.dto.EpiDTO;
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
	
	public List<MontaTelaEpiDTO> montaTelaEpi(String registro, Long idCliente) {
		
		MontaTelaEpiDTO montaTelaEpiDTO = new MontaTelaEpiDTO();
		List<FuncionarioDTO> lista = funcionarioService.findFuncio(registro, idCliente);
		montaTelaEpiDTO.setFuncionarioDTO(lista);
		ArrayList<MontaTelaEpiDTO> listaIdEpiRetorno = new ArrayList<>();
		ArrayList<Long> listaIdEpi = new ArrayList<>();
		
		if(!montaTelaEpiDTO.getFuncionarioDTO().isEmpty() && !montaTelaEpiDTO.getFuncionarioDTO().get(0).getCoringa().equals(null)) {
			if(!montaTelaEpiDTO.getFuncionarioDTO().get(0).getCoringa().equalsIgnoreCase("S")) {
				List<FuncXepiDTO> listaFuncXepi = funcXepiService.findByIdFuncio(montaTelaEpiDTO.getFuncionarioDTO().get(0).getId());
				for (FuncXepiDTO i : listaFuncXepi) {
					listaIdEpi.add(i.getIdEpi());
					montaTelaEpiDTO.setListaEpiDTO(epiService.findAll(listaIdEpi));
				}
				
			}else {
				montaTelaEpiDTO.setListaEpiDTO(epiService.findAllIdCliente(idCliente));
			}
			
			listaIdEpiRetorno.add(montaTelaEpiDTO);
			
		}
		return listaIdEpiRetorno;
	}
	



}
