package com.epi.deliver.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.services.s3.model.Bucket;
import com.epi.deliver.services.AwsService;

@RestController
@RequestMapping(value = "/buckets")
public class AwsController {
	
	
	@Autowired
	private AwsService s3Service;


    @GetMapping("/listarS3")
    public List<String> listBuckets(){
        var buckets = s3Service.listBuckets();
        var names = buckets.stream().map(Bucket::getName).collect(Collectors.toList());
        return names;
    }
    
    @GetMapping("/upload")
    public String uploadFile(@RequestParam String nomeArq){
        String retorno = s3Service.uploadFile(nomeArq);
        
        return retorno;
    }
    

}
