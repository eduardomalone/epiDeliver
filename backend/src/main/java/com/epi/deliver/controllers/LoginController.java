package com.epi.deliver.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epi.deliver.dto.AtualizaSenhaDTORequest;
import com.epi.deliver.dto.LoginDTO;
import com.epi.deliver.dto.LoginDTORequest;
import com.epi.deliver.dto.MontaTelaLoginDTO;
import com.epi.deliver.services.LoginService;
import com.epi.deliver.services.MontaTelaLoginService;


@RestController
@RequestMapping(value = "/loginUsuario")
public class LoginController {

	@Autowired
	private LoginService service;
	
	@Autowired
	private MontaTelaLoginService serviceTelaLogin;
	
	@Autowired
	private final PasswordEncoder encoder;
	
	public LoginController(LoginService service, PasswordEncoder encoder) {
		this.service = service;
		this.encoder = encoder;
	}
	
	@GetMapping
	public ResponseEntity<LoginDTO> findByLogin(@RequestParam String login){
		LoginDTO list = service.findByLogin(login);
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/listaTodos")
	public ResponseEntity <List<LoginDTO>> findAll(){
		List<LoginDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@PostMapping("/salvar")
	public ResponseEntity<LoginDTO> saveLogin(@RequestBody LoginDTO login){
		login.setSenha(encoder.encode(login.getSenha()));
		LoginDTO loginSave = service.save(login);
		return ResponseEntity.ok().body(loginSave);
	}
		
	
	@PostMapping("/validarSenha")
	public ResponseEntity<MontaTelaLoginDTO> validarSenha ( @RequestBody LoginDTORequest senha){
	
		MontaTelaLoginDTO telaLogin = serviceTelaLogin.validaTelaLogin(senha.getLogin(), senha.getSenha(), senha.getIdCliente());
		
		boolean valid = false;
		if(telaLogin.getFuncionario() == null || telaLogin.getFuncionario().getId() == null) {
			telaLogin.setAutorizado(valid);
			return ResponseEntity.status(HttpStatus.OK).body(telaLogin);
		}
		
		telaLogin.getLogin().getIdPerfil();
		
		valid = encoder.matches(senha.getSenha(), telaLogin.getLogin().getSenha());
		
		telaLogin.setAutorizado(valid);
		return ResponseEntity.status(HttpStatus.OK).body(telaLogin);

	}
	
	@PostMapping("/atualizarSenha")
	public ResponseEntity<MontaTelaLoginDTO> atualizarSenha ( @RequestBody AtualizaSenhaDTORequest senhaRequest){
	
		
		service.atualizarSenha(senhaRequest);
		
		MontaTelaLoginDTO telaLogin = serviceTelaLogin.validaTelaLogin(senhaRequest.getLogin(), senhaRequest.getSenha(), senhaRequest.getIdCliente());
		
		boolean valid = false;
		if(telaLogin.getFuncionario() == null || telaLogin.getFuncionario().getId() == null) {
			telaLogin.setAutorizado(valid);
			return ResponseEntity.status(HttpStatus.OK).body(telaLogin);
		}
		valid = encoder.matches(senhaRequest.getSenha(), telaLogin.getLogin().getSenha());
		
		telaLogin.setAutorizado(valid);
		return ResponseEntity.status(HttpStatus.OK).body(telaLogin);

	}
	
}
