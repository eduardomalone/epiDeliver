package com.epi.deliver.controllers;

import java.io.IOException;
import java.net.URI;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.epi.deliver.dto.ItemSolicitacaoDTO;
import com.epi.deliver.dto.PedidoDTO;
import com.epi.deliver.request.SolicitacaoRequest;
import com.epi.deliver.services.SolicitacaoService;


@RestController
@RequestMapping(value = "/solicitacao")
public class SolicitacaoController {
	
	@Autowired
	private SolicitacaoService service;
	
		
	@PostMapping
	public ResponseEntity<String>criaSolicitacao(@RequestBody SolicitacaoRequest request)throws IOException, Exception{
		
		try {
			PedidoDTO pedidoDTO = service.criaSolicitacao(request.getFuncionarioDTO(), request.getListaEpiDTO(), request.getListaCodBarras());
			
			JSONObject pedidoJson = new JSONObject(pedidoDTO);
			
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(pedidoDTO.getSolicitacaoDTO().getId()).toUri();
			//return ResponseEntity.created(null).body();
			return ResponseEntity.created(uri).body(pedidoJson.toString());
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity
		            .status(500)
		            .body("### Erro ao criar Solicitacao ###");
		}

	}
	
	@PutMapping("/{codBarras}/baixaItem/{idFunc}")
	public ResponseEntity<String>baixaItem(@PathVariable String codBarras, Long idFunc)throws IOException, Exception{
		ItemSolicitacaoDTO item = service.baixaSolicictacaoCodBarras(codBarras, idFunc);
		JSONObject pedidoJson = new JSONObject(item);
		return ResponseEntity.ok().body(pedidoJson.toString());
	}
		
	

}
