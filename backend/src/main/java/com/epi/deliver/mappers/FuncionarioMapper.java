package com.epi.deliver.mappers;

import org.modelmapper.ModelMapper;

import com.epi.deliver.dto.EpiDTO;
import com.epi.deliver.dto.FuncionarioDTO;
import com.epi.deliver.entities.TabEpi;
import com.epi.deliver.entities.TabFuncionario;

public class FuncionarioMapper {

	private ModelMapper modelMapper;

	public FuncionarioMapper() {
		modelMapper = new ModelMapper();
	}

	public TabFuncionario convertEntity(FuncionarioDTO funcionario) {
		return modelMapper.map(funcionario, TabFuncionario.class);
	}

	public TabFuncionario convert(String[] linha, Long idCliente) throws Exception {

		try {

			FuncionarioDTO func = new FuncionarioDTO();

			func.setIdCliente(idCliente);
			func.setStatus("1");
			func.setRegistro(linha[0]);
			func.setNome(linha[1]);
			func.setSetor(linha[2]);
			func.setCodFuncao(linha[3]);
			func.setCoringa("N");
			func.setPerf(null);

			return modelMapper.map(func, TabFuncionario.class);
		} catch (Exception e) {
			throw new Exception("Falha no mapper Funcionarios: " + e.getCause());
			// TODO: handle exception
		}

	}
}
