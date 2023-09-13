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

import com.epi.deliver.dto.FuncionarioDTO;
import com.epi.deliver.dto.LoginDTO;
import com.epi.deliver.services.FuncionarioService;
import com.epi.deliver.services.LoginService;

@RestController
@RequestMapping(value = "/funcionarios")
public class FuncionarioController {

	@Autowired
	private FuncionarioService service;
	
	@Autowired
	private LoginService loginService;

	@GetMapping
	public ResponseEntity<List<FuncionarioDTO>> findFuncio(@RequestParam String registro,
			@RequestParam Long idCliente) {
		List<FuncionarioDTO> list = service.findFuncio(registro, idCliente);
		return ResponseEntity.ok().body(list);
	}

	@PostMapping
	public ResponseEntity<FuncionarioDTO> saveFuncionario(@RequestBody FuncionarioDTO request) {
		FuncionarioDTO list = service.save(request);
		return ResponseEntity.ok().body(list);
	}

	@PutMapping
	public ResponseEntity<FuncionarioDTO> updateFuncionario(@RequestBody FuncionarioDTO request) {
		FuncionarioDTO list = service.save(request);
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/")
	public ResponseEntity<List<FuncionarioDTO>> findFuncionarios() {
		List<FuncionarioDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/cliente")
	public ResponseEntity<List<FuncionarioDTO>> findAllFuncioCli(@RequestParam Long idCliente) {
		List<FuncionarioDTO> list = service.findByIdCliente(idCliente);
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/funcionario/cliente")
	public ResponseEntity<FuncionarioDTO> findIdFuncioCli(@RequestParam Long idFunc, @RequestParam Long idCliente) {
		List<FuncionarioDTO> list = service.findByIdAndIdCliente(idFunc, idCliente);
		LoginDTO loginDTO = loginService.findByIdFuncioLogin(idFunc, list.get(0).getRegistro());
		list.get(0).setPerf(loginDTO.getIdPerfil());
		return ResponseEntity.ok().body(list.get(0));
	}

	@GetMapping("/funcionario/nome")
	public ResponseEntity<List<FuncionarioDTO>> findNome(@RequestParam String nome, @RequestParam Long idCliente) {
		List<FuncionarioDTO> list = service.findByNomeContainingAndIdCliente(idCliente, nome);
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/funcionario/registro")
	public ResponseEntity<List<FuncionarioDTO>> findRegistro( @RequestParam Long idCliente, @RequestParam String registro) {
		List<FuncionarioDTO> list = service.findByRegistroAndIdCliente(idCliente, registro);
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/carga")
	public ResponseEntity String(@RequestParam Long idCliente, @RequestParam String path) {
		String msg = service.cargaFuncionario(idCliente, path);
		return ResponseEntity.ok().body(msg);
	}
	
	@DeleteMapping
	public ResponseEntity<FuncionarioDTO> deletefunc(@RequestParam Long id) {
		service.delete(id);
		return ResponseEntity.ok().build();
	}

}
