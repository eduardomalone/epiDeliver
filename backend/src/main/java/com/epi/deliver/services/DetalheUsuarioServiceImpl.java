package com.epi.deliver.services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.epi.deliver.entities.TabLogin;
import com.epi.deliver.repositories.LoginRepository;

import dataJWT.DetalheUsuarioData;


@Component
public class DetalheUsuarioServiceImpl implements UserDetailsService{

	private final LoginRepository repository;
	
	
	public DetalheUsuarioServiceImpl(LoginRepository repository) {
		this.repository = repository;
	}

	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<TabLogin> login = repository.findByLogin(username);
		if (login.isEmpty()){
			throw new UsernameNotFoundException("Login [" + username + "] nao encontrado");
		}
		
		return new DetalheUsuarioData(login);
	}

}
