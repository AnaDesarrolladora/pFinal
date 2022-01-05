package com.mascotas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mascotas.model.Mascota;

@Repository
public interface MascotaDao extends CrudRepository<Mascota, Long> {
	/* CrudRepository<[Clase que se quiere recuperar de la BBDD], 
 	[tipo del id de la clase que se quiere recuperar]> */
	@Query("SELECT m FROM Mascota m WHERE m.id = :idMascota")
	public Mascota getMascota(
			@Param("idMascota") long idMascota);
	
	@Query("SELECT distinct(tipo) FROM Mascota")
	public List<String> getTipoMascotasEnVenta();
	
	@Query("SELECT m FROM Mascota m WHERE m.tipo = :tipoMascota")
	public List<Mascota> getMascotasEnVentaPorTipo(
			@Param("tipoMascota") String tipo);
}
