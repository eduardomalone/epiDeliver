package com.epi.deliver.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epi.deliver.dto.ResponseCargaDTO;
import com.epi.deliver.entities.TabFuncionario;
import com.epi.deliver.mappers.FuncionarioMapper;
import com.epi.deliver.repositories.FuncionarioRepository;

@Service
public class FuncCargaService {
	
	@Autowired
	private FuncionarioRepository repository;
	
	
	@Autowired
	private AwsService awsService;
	

	public ResponseCargaDTO leArquivo(String path, Long idCli) throws Exception {
		
		ArrayList<String> listaLida = new ArrayList<>();
		if(path !=null &&  !path.equals("")) {
			listaLida  = awsService.readFile(path);			
		}
		
		
		ResponseCargaDTO returnCarga = new ResponseCargaDTO();
		List<TabFuncionario> listaEntity = new ArrayList();
		ArrayList<String> listError = new ArrayList();
		ArrayList<String> listaLinhasComErro = new ArrayList();
		List<TabFuncionario> objFunc = new ArrayList();
		
		try {
			
			FuncionarioMapper mapper = new FuncionarioMapper();
		    
		    int i = 1;
		    for (String line : listaLida) {
		    	
		    	System.out.println("#### linhas para serem validadas: " + line);
		    	String[] separados =  line.split(";");
		    	
		    	int qtdSeparados = separados.length;
		    	
		    	if(qtdSeparados == 4 && !separados[0].equals("")) {
		    		objFunc = repository.findByRegistroAndIdClienteAndStatus(separados[0], idCli, "1");
		
		    	}
		    	
		    	if((objFunc != null) && (objFunc.size() < 1) && (qtdSeparados == 4)) {
		    		listaEntity.add(mapper.convert(separados, idCli));
		    		System.out.println("#### Fez o mapper #### ");
		    	}else {
		    		//listError.add(separados[0]+"-"+separados[1]);
		    		System.out.println("#### problema na linha #### " + Integer.toString(i));
		    		listaLinhasComErro.add(Integer.toString(i)+";");
		    	}
		    	i++;
		    }
		    
			System.out.println("### Preparou para salvar ###");

			// manda salvar a lista
		
			repository.saveAll(listaEntity);
			System.out.println("#### salvou a lista lida ####");
			//service.deleteUploadFile(path);
			
			//awsService.delefeFile(path);
			//System.out.println("#### deletou arquivo do S3 ####");
		
		
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			throw new Exception("Falha no processamento da carga: " + e1.getCause());
		}
		
		returnCarga.setLinhasErro(listError);
		returnCarga.setQtdLinhasProcessadas(listaLinhasComErro.size() + listaEntity.size());
		returnCarga.setQtdLinhasErros(listaLinhasComErro.size());
		returnCarga.setLinhasComErro(listaLinhasComErro);
		returnCarga.setStatus("funcXepi");
		return returnCarga;
						
				
		
	}
}
