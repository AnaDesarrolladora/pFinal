package com.mascotas.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.mascotas.model.Comprador;

@Repository
public interface CompradorDao extends CrudRepository<Comprador, Long> {
	/* CrudRepository<[Clase que se quiere recuperar de la BBDD], 
 	[tipo del id de la clase que se quiere recuperar]> */

	@Query("SELECT c FROM Comprador c WHERE c.dni = UPPER(:dniComprador)")
	public Comprador getComprador(
			@Param("dniComprador") String dniComprador);
	
	@Query("SELECT c FROM Comprador c WHERE c.id = :idComprador")
	public Comprador getComprador(
			@Param("idComprador") long idComprador);
}
