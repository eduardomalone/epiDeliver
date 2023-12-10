package com.epi.deliver.services;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.epi.deliver.dto.ClienteDTO;
import com.epi.deliver.dto.ResponseCargaDTO;
import com.epi.deliver.entities.TabCliente;
import com.epi.deliver.entities.TabEpi;
import com.epi.deliver.entities.TabFuncionario;
import com.epi.deliver.mappers.EpiMapper;
import com.epi.deliver.mappers.FuncionarioMapper;
import com.epi.deliver.repositories.ClienteRepository;
import com.epi.deliver.repositories.EpiRepository;
import com.epi.deliver.repositories.FuncionarioRepository;

@Service
public class FuncCargaService {
	
	@Value("${diretorio.mac.carga}")
	private String diretorioCarga;
	
	@Value("${comando.curl.upload}")
	private String comandoCurl;
	
	@Value("${comand.curl.token}")
	private String chaveSimpleFileUpload;
	
	
	@Autowired
	private FuncionarioRepository repository;
	
	@Autowired
	private UploadFileService service;
	

	public ResponseCargaDTO leArquivo(String path, Long idCli) throws Exception {
		
		String urlResponse = "";
		ResponseCargaDTO returnCarga = new ResponseCargaDTO();
		List<TabFuncionario> listaEntity = new ArrayList();
		ArrayList<String> listError = new ArrayList();
		ArrayList<String> listaLinhasComErro = new ArrayList();
		List<TabFuncionario> objFunc = new ArrayList();
		
		try {
			
			urlResponse = service.uploadFile(path);
			
			FuncionarioMapper mapper = new FuncionarioMapper();
		
			URL oracle = new URL(urlResponse);
			BufferedReader in = new BufferedReader(new InputStreamReader(oracle.openStream()));

		    String inputLine;
		    int i = 1;
		    while ((inputLine = in.readLine()) != null) {
		    	System.out.println(inputLine);
		    	String[] separados =  inputLine.split(";");
		    	
		    	int qtdSeparados = separados.length;
		    	
		    	if(qtdSeparados == 4) {
		    		objFunc = repository.findByRegistroAndIdClienteAndStatus(separados[0], idCli, "1");
		    	}
		    	
		    	if((objFunc != null && objFunc.size() != 0) && (qtdSeparados == 4)) {
		    		listaEntity.add(mapper.convert(separados, idCli));
		    	}else {
		    		//listError.add(separados[0]+"-"+separados[1]);
		    		listaLinhasComErro.add(Integer.toString(i)+";");
		    	}
		    	i++;
		    }
		    	
		    in.close();
			System.out.println("leu o aerquivo");

		
			// manda salvar a lista
		
			repository.saveAll(listaEntity);
			service.deleteUploadFile(path);
		
		
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			service.deleteUploadFile(path);
			throw new Exception("Falha no processamento da carga: " + e1.getCause());
		}
		
		returnCarga.setLinhasErro(listError);
		returnCarga.setQtdLinhasProcessadas(listError.size() + listaEntity.size());
		returnCarga.setQtdLinhasErros(listaLinhasComErro.size());
		returnCarga.setLinhasComErro(listaLinhasComErro);
		returnCarga.setStatus("func");
		return returnCarga;
						
				
		
	}
}
