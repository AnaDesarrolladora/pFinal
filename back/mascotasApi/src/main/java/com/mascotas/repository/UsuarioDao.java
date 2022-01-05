package com.mascotas.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mascotas.model.Usuario;

@Repository
public interface UsuarioDao extends CrudRepository<Usuario, Long> {
	/* CrudRepository<[Clase que se quiere recuperar de la BBDD], 
	 	[tipo del id de la clase que se quiere recuperar]> */
	
	@Query("SELECT u FROM Usuario u WHERE u.username = :usuario and u.password = :contrasenia")
	public Usuario getUsuarioLogado(
			@Param("usuario") String usuario, 
			@Param("contrasenia") String contrasenia);
	
	@Query("SELECT u FROM Usuario u WHERE u.id = :idUsuario")
	public Usuario getUsuario(
			@Param("idUsuario") long idUsuario);
}
