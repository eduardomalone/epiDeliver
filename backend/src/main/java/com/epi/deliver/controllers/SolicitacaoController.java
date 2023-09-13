package com.epi.deliver.controllers;

import java.io.IOException;
import java.net.URI;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.epi.deliver.dto.ClienteDTO;
import com.epi.deliver.dto.EpiDTO;
import com.epi.deliver.dto.ItemSolicitacaoDTO;
import com.epi.deliver.dto.ItemSolicitacaoEpiDTO;
import com.epi.deliver.dto.PedidoDTO;
import com.epi.deliver.request.SolicitacaoRequest;
import com.epi.deliver.request.SolicitacaoRequestBaixa;
import com.epi.deliver.services.EpiService;
import com.epi.deliver.services.SolicitacaoService;


@RestController
@RequestMapping(value = "/solicitacao")
public class SolicitacaoController {
	
	@Autowired
	private SolicitacaoService service;
	
	@Autowired
	private EpiService serviceEpi;
		
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
	
	@PutMapping("/baixa")
	public ResponseEntity<String>baixaItem(@RequestBody SolicitacaoRequestBaixa request)throws IOException, Exception{
		ItemSolicitacaoDTO item = service.baixaSolicictacaoCodBarras(request.getBarCode(), request.getIdFuncBaixa());
		JSONObject pedidoJson = new JSONObject(item);
		return ResponseEntity.ok().body(pedidoJson.toString());
	}
	
	@GetMapping("/busca")
	public ResponseEntity<ItemSolicitacaoEpiDTO> findAll(@RequestParam String cobBarras) throws Exception{
		ItemSolicitacaoEpiDTO itemSolicitacaoEpiDTO = new ItemSolicitacaoEpiDTO();
		ItemSolicitacaoDTO item = service.buscaSolicictacaoCodBarras(cobBarras);
		if(item.getId() != null) {
			EpiDTO epi = serviceEpi.findId(item.getIdEpi());
			itemSolicitacaoEpiDTO.setEpiDTO(epi);
			itemSolicitacaoEpiDTO.setItemSolicitacaoDTO(item);
			return ResponseEntity.ok().body(itemSolicitacaoEpiDTO);
		}
		
		return ResponseEntity.notFound().build();
	}
		
	

}
