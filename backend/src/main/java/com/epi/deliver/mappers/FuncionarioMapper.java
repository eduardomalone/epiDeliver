package com.epi.deliver.mappers;

import org.modelmapper.ModelMapper;

import com.epi.deliver.dto.FuncionarioDTO;
import com.epi.deliver.entities.TabFuncionario;

public class FuncionarioMapper {

	private ModelMapper modelMapper;

    public FuncionarioMapper() {
        modelMapper = new ModelMapper();
    }

    public TabFuncionario convertEntity(FuncionarioDTO funcionario) {
        return modelMapper.map(funcionario, TabFuncionario.class);
    }

}
