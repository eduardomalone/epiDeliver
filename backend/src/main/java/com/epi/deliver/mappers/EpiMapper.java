package com.epi.deliver.mappers;

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

}
