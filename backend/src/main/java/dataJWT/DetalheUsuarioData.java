package dataJWT;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.epi.deliver.entities.TabLogin;

public class DetalheUsuarioData implements UserDetails{
	
	private final Optional<TabLogin> login;
	
	
	public DetalheUsuarioData(Optional<TabLogin> login) {
		this.login = login;
	}


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return new ArrayList<>();
	}

	@Override
	public String getPassword() {
		return login.orElse(new TabLogin()).getSenha();
	}

	@Override
	public String getUsername() {
		return login.orElse(new TabLogin()).getLogin();
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

}
