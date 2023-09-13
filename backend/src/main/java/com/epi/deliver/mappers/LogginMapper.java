package com.epi.deliver.mappers;

import java.util.Map;
import java.util.Optional;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;

import com.epi.deliver.dto.LoginDTO;
import com.epi.deliver.entities.TabLogin;

public class LogginMapper {
	
	private ModelMapper modelMapper;

    public LogginMapper() {
    	//modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setSkipNullEnabled(true);
        modelMapper.getConfiguration().setPropertyCondition(context ->
        context.getSource() != null || !Map.class.isAssignableFrom(context.getSourceType()));
    }

    public LoginDTO convertDTO(TabLogin login) {
        return modelMapper.map(login, LoginDTO.class);
    }
    
    public TabLogin convertEntity(LoginDTO login) {
        return modelMapper.map(login, TabLogin.class);
    }


}
