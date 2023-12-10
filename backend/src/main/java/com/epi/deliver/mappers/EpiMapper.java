package com.epi.deliver.mappers;

import java.util.List;

import org.modelmapper.ModelMapper;

import com.epi.deliver.dto.EpiDTO;
import com.epi.deliver.entities.TabEpi;

public class EpiMapper {

	private ModelMapper modelMapper;

    public EpiMapper() {
        modelMapper = new ModelMapper();
    }

    public TabEpi convertEntity(EpiDTO epiDto) {
        return modelMapper.map(epiDto, TabEpi.class);
    }
    
    public TabEpi convertEpi (String[] linha, Long idCliente ) throws Exception {
    	
    	try {
			
    		EpiDTO epi = new EpiDTO();
    		
    		epi.setIdCliente(idCliente);
    		epi.setStatus("1");
    		epi.setCodigo(linha[0]);
    		epi.setDescricao(linha[1]);
    		epi.setValidade(Integer.parseInt(linha[2]));
    		
    		//System.out.println(modelMapper.map(epi, TabEpi.class));
    		return modelMapper.map(epi, TabEpi.class);
		} catch (Exception e) {
			throw new Exception("Falha na leitura do arquivo: " + e.getCause());
			// TODO: handle exception
		}
    	
    	
    }

}
