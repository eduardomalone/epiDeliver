package com.epi.deliver.security;

import java.util.Arrays;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.epi.deliver.services.DetalheUsuarioServiceImpl;


//@EnableWebSecurity
public class JWTConfiguracao extends WebSecurityConfigurerAdapter{
	
	private final DetalheUsuarioServiceImpl usuarioServiceImpl;
	private final PasswordEncoder passwordEncoder;
	//private SessionManagementConfigurer<HttpSecurity> sessionCreationPolicy;
	
	public JWTConfiguracao(DetalheUsuarioServiceImpl usuarioServiceImpl, PasswordEncoder passwordEncoder) {
		//super();
		this.usuarioServiceImpl = usuarioServiceImpl;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// TODO Auto-generated method stub
		auth.userDetailsService(usuarioServiceImpl).passwordEncoder(passwordEncoder);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		//liberacao de seguranca
		//http.cors().and().csrf().disable();
		//TODO
		http.csrf().disable().authorizeRequests()
			.antMatchers("/sistemaEpi/**").permitAll()
			.antMatchers(HttpMethod.POST, "/login").permitAll()
			//.anyRequest().permitAll()
			.anyRequest().authenticated()
			.and()
			.addFilter(new JWTAutenticarFilter(authenticationManager()))
			.addFilter(new JWTValidarFilter(authenticationManager()))
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
	}
	// libera dominios
	@Bean
	CorsConfigurationSource corsConfiguration() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
		corsConfiguration.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "DELETE", "OPTIONS"));
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.addAllowedOrigin("*");
		corsConfiguration.addAllowedHeader("*");
		corsConfiguration.addAllowedMethod("*");
		source.registerCorsConfiguration("/**", corsConfiguration);
		return source;
	}
	
	@Bean
    public FilterRegistrationBean corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
        bean.setOrder(0);
        return bean;
    }
	

}
