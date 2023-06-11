package com.epi.deliver.mappers;

import java.lang.reflect.Type;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;

import com.epi.deliver.dto.ItemSolicitacaoDTO;
import com.epi.deliver.dto.SolicitacaoDTO;
import com.epi.deliver.entities.TabItemSolicitacao;
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
	    
	    public List<ItemSolicitacaoDTO> convertListDTO(List<TabItemSolicitacao> itemSolicitacaoList) {
	    	ModelMapper modelMapper = new ModelMapper();
			Type listType = new TypeToken<List<ItemSolicitacaoDTO>>(){}.getType();
			List<ItemSolicitacaoDTO> postDtoList = modelMapper.map(itemSolicitacaoList,listType);
			return postDtoList;
	    }
}
