package com.epi.deliver.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.epi.deliver.entities.TabLogin;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import dataJWT.DetalheUsuarioData;

public class JWTAutenticarFilter extends UsernamePasswordAuthenticationFilter{
	
	private final AuthenticationManager authenticationManager;
	public static final int TOKEN_EXPIRACAO = 600_000;
	public static final String TOKEN_SENHA = "c9169f39-9d7d-43c8-8581-6b6dea38b5f4";
	

	public JWTAutenticarFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		
		try {
			TabLogin login = new ObjectMapper().readValue(request.getInputStream(), TabLogin.class);
		
			return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					login.getLogin(),
					login.getSenha(),
					new ArrayList<>()
					));
		
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("Falha ao autenticar usuario", e);
		} 
		
		
		//return super.attemptAuthentication(request, response);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request,
			HttpServletResponse response, 
			FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		
		DetalheUsuarioData usuarioData = (DetalheUsuarioData) authResult.getPrincipal();
		
		String token = JWT.create()
				.withSubject(usuarioData.getUsername())
				.withExpiresAt(new Date(System.currentTimeMillis()+ TOKEN_EXPIRACAO))
				.sign(Algorithm.HMAC512(TOKEN_SENHA));
		
		response.getWriter().write(token);
		response.getWriter().flush();
		
	}
	

}
