package com.epi.deliver.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epi.deliver.dto.ResponseCargaDTO;
import com.epi.deliver.services.EpiCargaService;
import com.epi.deliver.services.FuncCargaService;
import com.epi.deliver.services.FuncXEpiCargaService;

@RestController
@RequestMapping(value = "/carga")
public class LeArquivoController {
	
	@Autowired
	private EpiCargaService serviceEpi;
	
	@Autowired
	private FuncCargaService serviceFunc;
	
	
	@Autowired
	private FuncXEpiCargaService serviceFuncXepi;
	
	@GetMapping("/epi")
	public ResponseEntity<ResponseCargaDTO> uploadEpi(@RequestParam String path, @RequestParam Long idCli) throws Exception{
		
		try {
			ResponseCargaDTO retorno = serviceEpi.leArquivoEPI(path, idCli);
			return ResponseEntity.ok().body(retorno);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.status(500).build();

		}
	}
	
	@GetMapping("/func")
	public ResponseEntity<ResponseCargaDTO> uploadFunc(@RequestParam String path, @RequestParam Long idCli) throws Exception{
		
		try {
			ResponseCargaDTO retorno = serviceFunc.leArquivo(path, idCli);
			return ResponseEntity.ok().body(retorno);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.status(500).build();

		}
	}
	
	
	@GetMapping("/funcXepi")
	public ResponseEntity<ResponseCargaDTO> uploadFuncXepi(@RequestParam String path, @RequestParam Long idCli) throws Exception{
		
		try {
			ResponseCargaDTO retorno = serviceFuncXepi.leArquivo(path, idCli);
			return ResponseEntity.ok().body(retorno);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.status(500).build();

		}
	}
	
	
//	@GetMapping("/datasBaixa")
//	public ResponseEntity<List<RelatorioDatasBaixaEntityDTO>> findRelatorioDatasBaixa(@RequestParam String data1, @RequestParam String data2, @RequestParam Long idCli){
//		List<RelatorioDatasBaixaEntityDTO> list = service.findRelatorioDatasBaixa(data1, data2, idCli);
//		return ResponseEntity.ok().body(list);
//	}
//	
//	
//	@GetMapping("/datasBaixaFunc")
//	public ResponseEntity<List<RelatorioDatasBaixaEntityDTO>> findRelatorioDatasBaixaFunc(@RequestParam String registro, @RequestParam Long idCli){
//		List<RelatorioDatasBaixaEntityDTO> list = service.findRelatorioDatasBaixaFunc(registro, idCli);
//		return ResponseEntity.ok().body(list);
//	}

}
