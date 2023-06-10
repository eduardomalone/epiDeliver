package com.epi.deliver.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epi.deliver.dto.FuncionarioDTO;
import com.epi.deliver.services.FuncionarioService;

@RestController
@RequestMapping(value = "/funcionarios")
public class FuncionarioController {

	@Autowired
	private FuncionarioService service;
	
	@GetMapping
	public ResponseEntity<List<FuncionarioDTO>> findFuncio(@RequestParam String registro, @RequestParam Long idCliente){
		List<FuncionarioDTO> list = service.findFuncio(registro, idCliente);
		return ResponseEntity.ok().body(list);
	}
	
}
