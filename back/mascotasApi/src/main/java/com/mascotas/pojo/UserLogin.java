package com.mascotas.pojo;

public class UserLogin {
	private String usuario;
	private String contrasenia;
	
	public UserLogin() {
		this.usuario = "";
		this.contrasenia = "";
	}

	public String getUsuario() {
		return this.usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getContrasenia() {
		return this.contrasenia;
	}

	public void setContrasenia(String contrasenia) {
		this.contrasenia = contrasenia;
	}
	
	
}
