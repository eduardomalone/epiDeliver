package com.epi.deliver.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tab_funcxepi")
public class TabFuncXepi implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long idFuncio;
	private Long idEpi;
	
	public TabFuncXepi() {
	}

	public TabFuncXepi(Long id, Long idFuncio, Long idEpi) {
		this.id = id;
		this.idFuncio = idFuncio;
		this.idEpi = idEpi;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TabFuncXepi other = (TabFuncXepi) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getIdFuncio() {
		return idFuncio;
	}

	public void setIdFuncio(Long idFuncio) {
		this.idFuncio = idFuncio;
	}

	public Long getIdEpi() {
		return idEpi;
	}

	public void setIdEpi(Long idEpi) {
		this.idEpi = idEpi;
	}
	

}
