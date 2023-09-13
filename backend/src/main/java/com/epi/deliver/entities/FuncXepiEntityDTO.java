package com.epi.deliver.entities;

import java.io.Serializable;



//public class FuncXepiEntityDTO implements Serializable{
//
//	private static final long serialVersionUID = 1L;
//	
//	private String registro;
//	private String codigo;
//	
//	
//	
//	public FuncXepiEntityDTO() {
//	}
//
//
//
//	public String getRegistro() {
//		return registro;
//	}
//
//
//
//	public void setRegistro(String registro) {
//		this.registro = registro;
//	}
//
//
//
//	public String getCodigo() {
//		return codigo;
//	}
//
//
//
//	public void setCodigo(String codigo) {
//		this.codigo = codigo;
//	}
//
//	
//	
//	
//}


public interface FuncXepiEntityDTO{
	
	Long getId();
	String getRegistro();
	String getCodigo();
	
}