package com.epi.deliver.services;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.epi.deliver.dto.ResponseCargaDTO;
import com.epi.deliver.entities.TabEpi;
import com.epi.deliver.entities.TabFuncXepi;
import com.epi.deliver.entities.TabFuncionario;
import com.epi.deliver.mappers.FuncXepiMapper;
import com.epi.deliver.repositories.EpiRepository;
import com.epi.deliver.repositories.FuncXepiRepository;
import com.epi.deliver.repositories.FuncionarioRepository;

@Service
public class FuncXEpiCargaService {
	
	@Value("${diretorio.mac.carga}")
	private String diretorioCarga;
	
	@Value("${comando.curl.upload}")
	private String comandoCurl;
	
	@Value("${comand.curl.token}")
	private String chaveSimpleFileUpload;
	
	
	@Autowired
	private FuncXepiRepository repository;
	
	@Autowired
	private FuncionarioRepository repositoryFunc;
	

	@Autowired
	private EpiRepository repositoryEpi;
	
	@Autowired
	private UploadFileService service;
	

	public ResponseCargaDTO leArquivo(String path, Long idCli) throws Exception {
		
		String urlResponse = "";
		ResponseCargaDTO returnCarga = new ResponseCargaDTO();
		List<TabFuncionario> objFunc = new ArrayList();
		Optional<TabEpi> objEpi = null;
		
		ArrayList<String> listError = new ArrayList();
		ArrayList<String> listaLinhasComErro = new ArrayList();
		List<TabFuncXepi> listaEntity = new ArrayList();
		
		try {
			
			urlResponse = service.uploadFile(path);
			
			FuncXepiMapper mapper = new FuncXepiMapper();
		
		
			URL oracle = new URL(urlResponse);
			BufferedReader in = new BufferedReader(new InputStreamReader(oracle.openStream()));

		    String inputLine;
		    int i = 1;
		    while ((inputLine = in.readLine()) != null) {
		    	System.out.println(inputLine);
		    	String[] separados =  inputLine.split(";");
		    	
		    	int qtdSeparados = separados.length;

		    	if(qtdSeparados == 2) {
		    		objFunc = repositoryFunc.findByRegistroAndIdClienteAndStatus(separados[0], idCli, "1");
		    		objEpi = repositoryEpi.findByCodigoAndStatus(separados[1], "1");
	
		    	}
		    	
		    	if((objFunc != null && objFunc.size() != 0) && (objEpi != null && objEpi.get() != null) && qtdSeparados == 2) {
		    		Long idFunc = objFunc.get(0).getId();
		    		Long idEpi = repositoryEpi.findByCodigoAndStatus(separados[1], "1").get().getId();
		    		listaEntity.add(mapper.convert(idFunc, idEpi, idCli));		 
		    		
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
		returnCarga.setQtdLinhasErros(listError.size());
		returnCarga.setLinhasComErro(listaLinhasComErro);
		returnCarga.setStatus("funcXepi");
		return returnCarga;
		
	}
}
