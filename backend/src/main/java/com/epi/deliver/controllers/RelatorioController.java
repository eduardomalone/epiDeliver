package com.epi.deliver.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epi.deliver.dto.ClienteDTO;
import com.epi.deliver.entities.RelatorioDatasBaixaEntityDTO;
import com.epi.deliver.entities.RelatorioDatasEntityDTO;
import com.epi.deliver.services.ClienteService;
import com.epi.deliver.services.RelatorioService;

@RestController
@RequestMapping(value = "/relatorios")
public class RelatorioController {
	
	@Autowired
	private RelatorioService service;
	
	@GetMapping("/datas")
	public ResponseEntity<List<RelatorioDatasEntityDTO>> findRelatorioDatas(@RequestParam String data1, @RequestParam String data2, @RequestParam Long idCli){
		List<RelatorioDatasEntityDTO> list = service.findRelatorioDatas(data1, data2, idCli);
		return ResponseEntity.ok().body(list);
	}
	
	
	@GetMapping("/datasBaixa")
	public ResponseEntity<List<RelatorioDatasBaixaEntityDTO>> findRelatorioDatasBaixa(@RequestParam String data1, @RequestParam String data2, @RequestParam Long idCli){
		List<RelatorioDatasBaixaEntityDTO> list = service.findRelatorioDatasBaixa(data1, data2, idCli);
		return ResponseEntity.ok().body(list);
	}
	
	
	@GetMapping("/datasBaixaFunc")
	public ResponseEntity<List<RelatorioDatasBaixaEntityDTO>> findRelatorioDatasBaixaFunc(@RequestParam String registro, @RequestParam Long idCli){
		List<RelatorioDatasBaixaEntityDTO> list = service.findRelatorioDatasBaixaFunc(registro, idCli);
		return ResponseEntity.ok().body(list);
	}

}
