package com.epi.deliver.services;

import java.io.IOException;

import org.springframework.stereotype.Service;

import com.aspose.barcode.EncodeTypes;
import com.aspose.barcode.generation.BarcodeGenerator;
import com.epi.deliver.dto.FuncionarioDTO;
import com.epi.deliver.dto.PedidoDTO;

@Service
public class CodigoDeBarrasService {
	
	public String gerarCodigoDeBarras(FuncionarioDTO funcionario, PedidoDTO pedidoDTO, String codigoEpi) throws IOException {
		
		
		String idSolicitacao = pedidoDTO.getSolicitacaoDTO().getId().toString();
		String idFuncio = funcionario.getId().toString();
		String regFunc = funcionario.getRegistro();
		// idItem = pedidoDTO.getItems().get(pedidoDTO.getItems().size()-1).getId().toString();
		String codEpi = codigoEpi;
		String codBArras = codigoEpi+idFuncio+regFunc+idSolicitacao;
		
		BarcodeGenerator generator = new BarcodeGenerator(EncodeTypes.CODE_128, codBArras);
		// definir resolução
		//generator.getParameters().setResolution(400);
		// gerar código de barras
		//generator.save("generate-barcode.png");
		System.out.println("### codigo de barras: "+ codBArras);
		return codBArras;	
	}

}
