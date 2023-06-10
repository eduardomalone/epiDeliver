package com.epi.deliver.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epi.deliver.dto.FuncXepiDTO;
import com.epi.deliver.dto.FuncionarioDTO;
import com.epi.deliver.services.FuncXepiService;
import com.epi.deliver.services.FuncionarioService;

@RestController
@RequestMapping(value = "/funcXepi")
public class FuncXepiController {

	@Autowired
	private FuncXepiService service;
	
	@GetMapping
	public ResponseEntity<List<FuncXepiDTO>> findByIdFuncio(@RequestParam Long idFunc){
		List<FuncXepiDTO> list = service.findByIdFuncio(idFunc);
		return ResponseEntity.ok().body(list);
	}
	
}
