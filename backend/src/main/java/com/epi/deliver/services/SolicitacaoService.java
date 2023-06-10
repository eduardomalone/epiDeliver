package com.epi.deliver.services;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.epi.deliver.dto.EpiDTO;
import com.epi.deliver.dto.FuncionarioDTO;
import com.epi.deliver.dto.ItemSolicitacaoDTO;
import com.epi.deliver.dto.PedidoDTO;
import com.epi.deliver.dto.SolicitacaoDTO;
import com.epi.deliver.entities.TabItemSolicitacao;
import com.epi.deliver.entities.TabSoliciatacao;
import com.epi.deliver.mappers.ItemSolicitacaoMapper;
import com.epi.deliver.mappers.SolicitacaoMapper;
import com.epi.deliver.repositories.ItemSolicitacaoRepository;
import com.epi.deliver.repositories.SolicitacaoRepository;
import com.epi.deliver.util.DatasUtil;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import java.lang.reflect.Type;

@Service
public class SolicitacaoService {
	
	@Autowired
	private SolicitacaoRepository repository;
	
	@Autowired
	private ItemSolicitacaoRepository itemrepository;
	
	@Autowired
	private CodigoDeBarrasService codigoDeBarrasService;


	@Transactional
	//public PedidoDTO criaSolicitacao(Long idFuncio, List<ItemSolicitacaoDTO> itens) throws IOException {
	public PedidoDTO criaSolicitacao(FuncionarioDTO funcionario, List<EpiDTO> itens) throws IOException, Exception {
				
		PedidoDTO pedidoDTO = new PedidoDTO();
		DatasUtil dataAtual = new DatasUtil();
	    	    
		SolicitacaoDTO dto = new SolicitacaoDTO();
		dto.setIdFuncio(funcionario.getId());
		dto.setData(dataAtual.dataAtualFormatada());
		
		TabSoliciatacao entity = new TabSoliciatacao(null, dto.getIdFuncio(), dto.getData());
		entity = repository.save(entity);
		
		TabSoliciatacao solicitacao = new TabSoliciatacao();
		solicitacao.setIdFuncio(dto.getIdFuncio());
		solicitacao.setData(dto.getData());
		repository.save(solicitacao);
		repository.flush();
		
		pedidoDTO.setSolicitacaoDTO(new SolicitacaoDTO(entity));
		pedidoDTO.setFuncionarioDTO(funcionario);
		List<ItemSolicitacaoDTO> items2 = new ArrayList<>();
		System.out.println("#########" + solicitacao.getId());
		
		ItemSolicitacaoMapper mapper = new ItemSolicitacaoMapper();
		List<TabItemSolicitacao> itemSolicitacaoList = new ArrayList<>();
		
		
		for (int i = 0; i < itens.size(); i++) {
			ItemSolicitacaoDTO itemSolicit = new ItemSolicitacaoDTO();
			itemSolicit.setIdSolicitacao(pedidoDTO.getSolicitacaoDTO().getId());
			itemSolicit.setCodigoBarra(codigoDeBarrasService.gerarCodigoDeBarras(funcionario, pedidoDTO, itens.get(i).getCodigo()));
			itemSolicit.setIdEpi(itens.get(i).getId());
			itemSolicit.setDataInclusao(pedidoDTO.getSolicitacaoDTO().getData());
			
			itemSolicitacaoList.add(mapper.convertEntity(itemSolicit));
		}
		itemSolicitacaoList = itemrepository.saveAll(itemSolicitacaoList);
		
		ModelMapper modelMapper = new ModelMapper();
		Type listType = new TypeToken<List<ItemSolicitacaoDTO>>(){}.getType();
		List<ItemSolicitacaoDTO> postDtoList = modelMapper.map(itemSolicitacaoList,listType);
		pedidoDTO.setItemSolicitacaoList(postDtoList);
		return pedidoDTO;
	}
	
	@Transactional
	public PedidoDTO baixaSolicictacaoIdSolicit(Long id) throws Exception {
		DatasUtil dataAtual = new DatasUtil();
		TabItemSolicitacao entity = itemrepository.getOne(id);
		entity.setDataBaixa(dataAtual.dataAtualFormatada());
		return null;
	}
	
	@Transactional
	public PedidoDTO baixaSolicictacaoCodBarras(String codBarras) throws Exception {
		DatasUtil dataAtual = new DatasUtil();
		Optional<TabItemSolicitacao> entity = itemrepository.findByCodigoBarra(codBarras);
		return null;
	}
	
	@Transactional
	public SolicitacaoDTO insert(SolicitacaoDTO dto) {
		TabSoliciatacao entity = new TabSoliciatacao(null, dto.getIdFuncio(), dto.getData());
		entity = repository.save(entity);
		return new SolicitacaoDTO(entity);
		
	}

}
