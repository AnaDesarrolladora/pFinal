package com.mascotas.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mascotas.model.Venta;

@Repository
public interface VentaDao extends CrudRepository<Venta, Long> {
	/* CrudRepository<[Clase que se quiere recuperar de la BBDD], 
 	[tipo del id de la clase que se quiere recuperar]> */
}
