package com.mascotas.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mascotas.model.Usuario;
import com.mascotas.repository.UsuarioDao;

@Service
public class UsuarioService {
	@Autowired
	UsuarioDao usuarioDaoImpl;
	
	public ArrayList<Usuario> getUsuarios() {
		return (ArrayList<Usuario>) usuarioDaoImpl.findAll();
	}
	
	public Usuario guardarUsuario(Usuario usuario) {
		return usuarioDaoImpl.save(usuario);
	}
	
	public Usuario actualizarUsuario(long idUsuarioLogado, Usuario usuarioActualizar) {
		Usuario usuarioActualizado = null;
		
		Usuario usuarioLogado = this.usuarioDaoImpl.getUsuario(idUsuarioLogado);
		if (usuarioLogado != null) {
			usuarioActualizado = usuarioDaoImpl.save(usuarioActualizar);
		}
		
		return usuarioActualizado;
	}
	
	public Usuario getUsuarioLogin(String usuario, String contrasenia) {
		return usuarioDaoImpl.getUsuarioLogado(usuario, contrasenia);
	}
	
	public Usuario getUsuario(long idUsuario) {
		return usuarioDaoImpl.getUsuario(idUsuario);
	}
	
	public void eliminarUsuario(long idUsuarioLogado, long idUsuarioBorrar) {
		Usuario usuarioLogado = this.usuarioDaoImpl.getUsuario(idUsuarioLogado);
		if (usuarioLogado != null) {
			Usuario usuarioBorrar = this.usuarioDaoImpl.getUsuario(idUsuarioBorrar);
			if (usuarioBorrar != null) {
				usuarioDaoImpl.delete(usuarioBorrar);
			}
		}
	}
}
