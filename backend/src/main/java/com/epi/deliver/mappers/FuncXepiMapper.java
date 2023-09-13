package com.epi.deliver.mappers;

import org.modelmapper.ModelMapper;

import com.epi.deliver.dto.EpiDTO;
import com.epi.deliver.dto.FuncXepiDTO;
import com.epi.deliver.entities.FuncXepiEntityDTO;
import com.epi.deliver.entities.TabEpi;
import com.epi.deliver.entities.TabFuncXepi;

public class FuncXepiMapper {

	private ModelMapper modelMapper;

    public FuncXepiMapper() {
        modelMapper = new ModelMapper();
    }

    public TabFuncXepi convertEntity(FuncXepiEntityDTO funcXepiDto) {
        return modelMapper.map(funcXepiDto, TabFuncXepi.class);
    }
    
    public TabFuncXepi convertEntity(FuncXepiDTO funcXepiDto) {
        return modelMapper.map(funcXepiDto, TabFuncXepi.class);
    }


}
