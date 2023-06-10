package com.epi.deliver.mappers;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;

import com.epi.deliver.dto.ItemSolicitacaoDTO;
import com.epi.deliver.entities.TabItemSolicitacao;

public class ItemSolicitacaoMapper {
	
	 private ModelMapper modelMapper;

	    public ItemSolicitacaoMapper() {
	        modelMapper = new ModelMapper();
	    }

	    public TabItemSolicitacao convertEntity(ItemSolicitacaoDTO itemSolicitacao) {
	        return modelMapper.map(itemSolicitacao, TabItemSolicitacao.class);
	    }
	    
}
