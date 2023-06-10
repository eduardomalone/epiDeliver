package com.epi.deliver.mappers;

import org.modelmapper.ModelMapper;

import com.epi.deliver.dto.SolicitacaoDTO;
import com.epi.deliver.entities.TabSoliciatacao;

public class SolicitacaoMapper {
	
	 private ModelMapper modelMapper;

	    public SolicitacaoMapper() {
	        modelMapper = new ModelMapper();
	    }

	    public SolicitacaoDTO convertDTO(TabSoliciatacao solicitacao) {
	        return modelMapper.map(solicitacao, SolicitacaoDTO.class);
	    }
	    
	    public TabSoliciatacao convertEntity(SolicitacaoDTO solicitacao) {
	        return modelMapper.map(solicitacao, TabSoliciatacao.class);
	    }
}
