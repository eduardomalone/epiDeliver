package com.epi.deliver.dto;


public class MontaTelaLoginDTO {
	
	private FuncionarioDTO funcionario;
	private LoginDTO login;
	private Boolean autorizado;
	
	
	public MontaTelaLoginDTO() {
	
	}

	
	public MontaTelaLoginDTO(FuncionarioDTO funcionario, LoginDTO login, Boolean autorizado) {
		this.funcionario = funcionario;
		this.login = login;
		this.autorizado = autorizado;
	}
	
	
	public FuncionarioDTO getFuncionario() {
		return funcionario;
	}
	public void setFuncionario(FuncionarioDTO funcionario) {
		this.funcionario = funcionario;
	}
	public LoginDTO getLogin() {
		return login;
	}
	public void setLogin(LoginDTO login) {
		this.login = login;
	}
	public Boolean getAutorizado() {
		return autorizado;
	}
	public void setAutorizado(Boolean autorizado) {
		this.autorizado = autorizado;
	}
	
	

}
