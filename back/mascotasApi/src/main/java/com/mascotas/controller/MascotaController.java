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
import com.mascotas.model.Mascota;
import com.mascotas.service.MascotaService;

@RestController
@RequestMapping("/mascota")
public class MascotaController {
	@Autowired
	MascotaService mascotaService;
	
	@GetMapping("/mascotas")
	public ArrayList<Mascota> getMascotas() {
		return mascotaService.getMascotas();
	}
	
	@GetMapping("/tipoMascotasVenta")
	public ArrayList<String> getTipoMascotasEnVenta() {
		return (ArrayList<String>) mascotaService.getTipoMascotasEnVenta();
	}
	
	@GetMapping("/mascotasVenta")
	public ArrayList<Mascota> getMascotasEnVenta() {
		return mascotaService.getMascotasEnVenta();
	}
	
	@PostMapping("/mascotasVentaTipo")
	public ArrayList<Mascota> getMascotasEnVentaPorTipo(
			@RequestBody String tipo) {
		return mascotaService.getMascotasEnVentaPorTipo(tipo);
	}
	
	@GetMapping("/{id}")
	public Mascota getMascota(
			@PathVariable("id") Long id) {
		return mascotaService.getMascota(id);
	}
	
	@PostMapping()
	public Mascota guardarMascota(
			@RequestBody Mascota mascota) {
		return this.mascotaService.saveMascota(mascota);
	}
	
	@PutMapping("/{idLogged}")
	public Mascota editarMascota(
			@PathVariable("idLogged") long idUsuarioLogado,
			@RequestBody Mascota mascota) {
		return this.mascotaService.actualizarMascota(idUsuarioLogado, mascota);
	}
	
	@DeleteMapping("/{idLogged}/{idRefered}")
	public void borrarMascota(
			@PathVariable("idLogged") long idUsuarioLogado,
			@PathVariable("idRefered") long idMascotaBorrar) {
		this.mascotaService.eliminarMascota(idUsuarioLogado, idMascotaBorrar);
	}
	
	
}

