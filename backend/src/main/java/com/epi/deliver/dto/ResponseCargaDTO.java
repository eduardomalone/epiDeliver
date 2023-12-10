package com.epi.deliver.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;



public class ResponseCargaDTO implements Serializable{
	
private static final long serialVersionUID = 1L;
	
	
	private ArrayList<String> linhasErro;
	private String status;
	private int qtdLinhasProcessadas;
	private int qtdLinhasErros;
	private ArrayList<String> linhasComErro;
	
	
	public ArrayList<String> getLinhasErro() {
		return linhasErro;
	}
	public void setLinhasErro(ArrayList<String> linhasErro) {
		this.linhasErro = linhasErro;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getQtdLinhasProcessadas() {
		return qtdLinhasProcessadas;
	}
	public void setQtdLinhasProcessadas(int qtdLinhasProcessadas) {
		this.qtdLinhasProcessadas = qtdLinhasProcessadas;
	}
	public int getQtdLinhasErros() {
		return qtdLinhasErros;
	}
	public void setQtdLinhasErros(int qtdLinhasErros) {
		this.qtdLinhasErros = qtdLinhasErros;
	}
	public ArrayList<String> getLinhasComErro() {
		return linhasComErro;
	}
	public void setLinhasComErro(ArrayList<String> linhasComErro) {
		this.linhasComErro = linhasComErro;
	}
	
	
	
	
}
