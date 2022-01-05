package com.mascotas.controller;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mascotas.model.Usuario;
import com.mascotas.pojo.UserLogin;
import com.mascotas.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
	@Autowired
	UsuarioService usuarioService;
	
	@GetMapping("/usuarios")
	public ArrayList<Usuario> getUsuarios() {
		return usuarioService.getUsuarios();
	}
	
	@GetMapping("/{id}")
	public Usuario getUsuario(
			@PathVariable("id") Long id) {
		return usuarioService.getUsuario(id);
	}
	
	@PostMapping()
	public Usuario guardarUsuario(
			@RequestBody Usuario usuario) {
		return this.usuarioService.guardarUsuario(usuario);
	}
	
	@PutMapping("/{idLogged}")
	public Usuario editarUsuario(
			@PathVariable("idLogged") long idUsuarioLogado,
			@RequestBody Usuario usuario) {
		return this.usuarioService.actualizarUsuario(idUsuarioLogado, usuario);
	}
	
	@DeleteMapping("/{idLogged}/{idRefered}")
	public void borrarUsuario(
			@PathVariable("idLogged") long idUsuarioLogado,
			@PathVariable("idRefered") long idUsuarioBorrar) {
		this.usuarioService.eliminarUsuario(idUsuarioLogado, idUsuarioBorrar);
	}
	
	@PostMapping("/login")
	public Usuario login(
			@RequestBody UserLogin userLogin) {
		System.out.println(userLogin.getUsuario() + ":" + userLogin.getContrasenia());
		return this.usuarioService.getUsuarioLogin(userLogin.getUsuario(), userLogin.getContrasenia());
	}
}
