package com.epi.deliver.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epi.deliver.dto.FuncXepiDTO;
import com.epi.deliver.dto.FuncionarioDTO;
import com.epi.deliver.entities.FuncXepiEntityDTO;
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
	
	
	@GetMapping("all")
	public ResponseEntity<List<FuncXepiEntityDTO>> epiXfunc(@RequestParam Long idCliente){
		List<FuncXepiEntityDTO> list = service.epiXfunc(idCliente);
		return ResponseEntity.ok().body(list);
	}
	
	
	@GetMapping("registro")
	public ResponseEntity<List<FuncXepiEntityDTO>> findRegistroEpiXfunc(@RequestParam Long idCliente, @RequestParam String registro){
		List<FuncXepiEntityDTO> list = service.findRegistroEpiXfunc(idCliente, registro);
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("detalheRegistro")
	public ResponseEntity<List<FuncXepiEntityDTO>> findDetalheRegistroEpiXfunc(@RequestParam Long idCliente, @RequestParam String registro){
		List<FuncXepiEntityDTO> list = service.findByIdEpiXfuncDetalhe(idCliente, registro);
		return ResponseEntity.ok().body(list);
	}
	

	@GetMapping("/id")
	public ResponseEntity<FuncXepiEntityDTO> findByIdEpiXfunc(@RequestParam Long idCliente, @RequestParam Long id){
		FuncXepiEntityDTO list = service.findByIdEpiXfunc(idCliente, id);
		return ResponseEntity.ok().body(list);
	}
	
	
	@PostMapping
	public ResponseEntity<FuncXepiDTO> saveEpiXfunc(@RequestBody FuncXepiDTO request) {
		FuncXepiDTO list = service.save(request);
		return ResponseEntity.ok().body(list);
	}
	
	@DeleteMapping
	public ResponseEntity<FuncXepiDTO> deleteEpiXfunc(@RequestParam Long id) {
		service.delete(id);
		return ResponseEntity.ok().build();
	}
	
}
