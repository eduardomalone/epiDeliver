package com.epi.deliver.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.epi.deliver.dto.MontaTelaEpiDTO;
import com.epi.deliver.services.MontaTelaEpiService;

@RestController
@RequestMapping(value = "/montaTelaEpi")
public class MontaTelaEpiController {
	
	@Autowired
	private MontaTelaEpiService service;
	
	@GetMapping
	public ResponseEntity<List<MontaTelaEpiDTO>> montaTelaEpi(@RequestParam String registro, @RequestParam Long idCliente){
		List<MontaTelaEpiDTO> funcio = service.montaTelaEpi(registro, idCliente);
		
		System.out.println("########## montaTelaEpi ############");
		return ResponseEntity.ok().body(funcio);
	}

}
