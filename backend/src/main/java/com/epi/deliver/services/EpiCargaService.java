package com.epi.deliver.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epi.deliver.dto.ResponseCargaDTO;
import com.epi.deliver.entities.TabEpi;
import com.epi.deliver.mappers.EpiMapper;
import com.epi.deliver.repositories.EpiRepository;

@Service
public class EpiCargaService {

	@Autowired
	private EpiRepository repository;


	@Autowired
	private AwsService awsService;

	public ResponseCargaDTO leArquivoEPI(String path, Long idCli) throws Exception {

		ArrayList<String> listaLida = new ArrayList<>();
		if (path != null && !path.equals("")) {
			listaLida = awsService.readFile(path);
		}

		ResponseCargaDTO returnCarga = new ResponseCargaDTO();
		List<TabEpi> listaEntity = new ArrayList();
		ArrayList<String> listError = new ArrayList();
		ArrayList<String> listaLinhasComErro = new ArrayList();
		List<TabEpi> objFunc = new ArrayList();

		try {

			EpiMapper mapper = new EpiMapper();

			int i = 1;
			for (String line : listaLida) {

				System.out.println(line);
				String[] separados = line.split(";");

				int qtdSeparados = separados.length;

				if (qtdSeparados == 3) {
					objFunc = repository.findByIdClienteAndCodigoAndStatus(idCli, separados[0], "1");
				}
				if ((objFunc != null && objFunc.size() != 0) && qtdSeparados == 3) {
					listaEntity.add(mapper.convertEpi(separados, idCli));
				} else {
					listError.add(separados[0] + "-" + separados[1]);
					listaLinhasComErro.add(Integer.toString(i) + ";");
				}

				i++;
			}

			System.out.println("leu o aerquivo");

			// manda salvar a lista

			repository.saveAll(listaEntity);
			System.out.println("#### salvou a lista lida ####");
			
			//awsService.delefeFile(path);
			//System.out.println("#### deletou arquivo do S3 ####");

		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
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
