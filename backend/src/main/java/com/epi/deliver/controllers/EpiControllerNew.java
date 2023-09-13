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

import com.epi.deliver.dto.EpiDTO;
import com.epi.deliver.services.EpiService;



@RestController
@RequestMapping(value = "/epis")
public class EpiControllerNew {
	
//	@Autowired
//	private EpiService service;
//	
//	@GetMapping("/cliente")
//	public ResponseEntity<List<EpiDTO>> findAllCliente(@RequestParam Long idCliente){
//		List<EpiDTO> list = service.findAllIdCliente(idCliente);
//		return ResponseEntity.ok().body(list);
//	}
//	
//	@GetMapping("/codigo")
//	public ResponseEntity<List<EpiDTO>> findByCodAndCliente(@RequestParam Long idCliente, @RequestParam String codEpi){
//		List<EpiDTO>  list = service.findByCodAndCliente(idCliente, codEpi);
//		return ResponseEntity.ok().body(list);
//	}
//	
//	@GetMapping("/epi")
//	public ResponseEntity<EpiDTO> findIdEpi(@RequestParam Long idEpi){
//		EpiDTO list = service.findIdEpi(idEpi);
//		return ResponseEntity.ok().body(list);
//	}
//	
//	@PostMapping("/epi")
//	public ResponseEntity<EpiDTO> save(@RequestBody EpiDTO epiDto){
//		EpiDTO list = service.save(epiDto);
//		return ResponseEntity.ok().body(list);
//	}
//	
//	@PutMapping
//	public ResponseEntity<EpiDTO> update(@RequestBody EpiDTO request) {
//		EpiDTO list = service.save(request);
//		return ResponseEntity.ok().body(list);
//	}
//	
//	
//	@GetMapping("/descricao")
//	public ResponseEntity<List<EpiDTO>> findByDescricao(@RequestParam Long idCliente, @RequestParam String descricao){
//		List<EpiDTO>  list = service.findByDescricao(idCliente, descricao);
//		return ResponseEntity.ok().body(list);
//	}
//	
//	@DeleteMapping
//	public ResponseEntity<EpiDTO> delete(@RequestParam Long id) {
//		service.delete(id);
//		return ResponseEntity.ok().build();
//	}
//

}
