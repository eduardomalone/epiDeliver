package com.epi.deliver.mappers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.epi.deliver.dto.EpiDTO;
import com.epi.deliver.dto.FuncXepiDTO;
import com.epi.deliver.dto.FuncionarioDTO;
import com.epi.deliver.entities.FuncXepiEntityDTO;
import com.epi.deliver.entities.TabEpi;
import com.epi.deliver.entities.TabFuncXepi;
import com.epi.deliver.entities.TabFuncionario;
import com.epi.deliver.repositories.EpiRepository;
import com.epi.deliver.repositories.FuncXepiRepository;
import com.epi.deliver.services.EpiService;
import com.epi.deliver.services.FuncXepiService;
import com.epi.deliver.services.FuncionarioService;


@Component
public class FuncXepiMapper {

	private ModelMapper modelMapper;
	
	@Autowired
	private EpiService epiService;
	
	@Autowired
	private FuncionarioService funcService;
	
	@Autowired
	private FuncXepiService funcXepiService;
	
	@Autowired
	private FuncXepiRepository repository;
	
	

    public FuncXepiMapper() {
        modelMapper = new ModelMapper();
    }

    public TabFuncXepi convertEntity(FuncXepiEntityDTO funcXepiDto) {
        return modelMapper.map(funcXepiDto, TabFuncXepi.class);
    }
    
    public TabFuncXepi convertEntity(FuncXepiDTO funcXepiDto) {
        return modelMapper.map(funcXepiDto, TabFuncXepi.class);
    }
    
    public TabFuncXepi convert(Long idFunc, Long idEpi, Long idCliente) throws Exception {

		try {

			FuncXepiDTO funcXepiDto = new FuncXepiDTO();
			
			funcXepiDto.setIdEpi(idEpi);
			funcXepiDto.setIdFuncio(idFunc);
			funcXepiDto.setStatus("1");
			
			return modelMapper.map(funcXepiDto, TabFuncXepi.class);
		} catch (Exception e) {
			throw new Exception("Falha no mapper FuncXepi: " + e.getCause());
			// TODO: handle exception
		}

	}


}
