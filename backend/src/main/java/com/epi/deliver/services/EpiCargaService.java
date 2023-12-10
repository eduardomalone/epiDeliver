package com.epi.deliver.services;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.epi.deliver.dto.ResponseCargaDTO;
import com.epi.deliver.entities.TabEpi;
import com.epi.deliver.mappers.EpiMapper;
import com.epi.deliver.repositories.EpiRepository;

@Service
public class EpiCargaService {
	
	@Value("${diretorio.carga}")
	private String diretorioCarga;
	
	@Value("${comando.curl.upload}")
	private String comandoCurl;
	
	@Value("${comand.curl.token}")
	private String chaveSimpleFileUpload;

	@Autowired
	private EpiRepository repository;
	
	@Autowired
	private UploadFileService service;
	
	
	public ResponseCargaDTO leArquivoEPI(String path, Long idCli) throws Exception {
		
		String urlResponse = "";
		ResponseCargaDTO returnCarga = new ResponseCargaDTO();
		List<TabEpi> listaEntity = new ArrayList();
		ArrayList<String> listError = new ArrayList();
		ArrayList<String> listaLinhasComErro = new ArrayList();
		List<TabEpi> objFunc = new ArrayList();
		
		try {
			
			urlResponse = service.uploadFile(path);
			EpiMapper mapper = new EpiMapper();
			
			//URL oracle = new URL("https://cdn-3jc8kd20.files-simplefileupload.com/static/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBM0NMQXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--698c267c1786409e5e9c6acf0cd40f25ff1b718e/epis.txt");
			URL oracle = new URL(urlResponse);
			BufferedReader in = new BufferedReader(new InputStreamReader(oracle.openStream()));
			int i = 1;
		    String inputLine;
		    while ((inputLine = in.readLine()) != null) {
		    	System.out.println(inputLine);
		    	String[] separados =  inputLine.split(";");
		    	
		    	int qtdSeparados = separados.length;
		    	
		    	if(qtdSeparados == 3) {
		    		objFunc = repository.findByIdClienteAndCodigoAndStatus(idCli, separados[0], "1");
		    	}
		    	if((objFunc != null && objFunc.size() != 0) && qtdSeparados == 3) {
		    		listaEntity.add(mapper.convertEpi(separados, idCli));
		    	}else {
		    		listError.add(separados[0]+"-"+separados[1]);
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
		returnCarga.setQtdLinhasErros(listError.size());
		returnCarga.setLinhasComErro(listaLinhasComErro);
		returnCarga.setStatus("epi");
		return returnCarga;
				
		
	}
}
