package com.mascotas.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mascotas.model.Mascota;
import com.mascotas.model.Usuario;
import com.mascotas.model.Venta;
import com.mascotas.repository.MascotaDao;
import com.mascotas.repository.UsuarioDao;
import com.mascotas.repository.VentaDao;

@Service
public class MascotaService {
	@Autowired
	MascotaDao mascotaDaoImpl;
	@Autowired
	UsuarioDao usuarioDaoImpl;
	@Autowired
	VentaDao ventaDaoImpl;
	
	public ArrayList<Mascota> getMascotas() {
		return (ArrayList<Mascota>) mascotaDaoImpl.findAll();
	}
	
	public ArrayList<Mascota> getMascotasEnVenta() {
		List<Mascota> listadoMascotas = (ArrayList<Mascota>) mascotaDaoImpl.findAll();
		List<Venta> listadoVentas = (ArrayList<Venta>) ventaDaoImpl.findAll();		
		Iterator<Venta> itListadoVentas = listadoVentas.iterator();
		while (itListadoVentas.hasNext()) {
			Venta ventaActual = itListadoVentas.next();
			Mascota mascotaActualVenta = mascotaDaoImpl.getMascota(ventaActual.getIdMascota());
			listadoMascotas.remove(mascotaActualVenta);
		}
		
		return (ArrayList<Mascota>) listadoMascotas;
	}
	
	public ArrayList<Mascota> getMascotasEnVentaPorTipo(String tipo) {
		List<Mascota> listadoMascotas = null;
		
		if (!tipo.equalsIgnoreCase("0")) {
			listadoMascotas = (ArrayList<Mascota>) mascotaDaoImpl.getMascotasEnVentaPorTipo(tipo);
			List<Venta> listadoVentas = (ArrayList<Venta>) ventaDaoImpl.findAll();		
			Iterator<Venta> itListadoVentas = listadoVentas.iterator();
			while (itListadoVentas.hasNext()) {
				Venta ventaActual = itListadoVentas.next();
				Mascota mascotaActualVenta = mascotaDaoImpl.getMascota(ventaActual.getIdMascota());
				listadoMascotas.remove(mascotaActualVenta);
			}
		} else {
			listadoMascotas = this.getMascotasEnVenta();
		}
		
		
		
		return (ArrayList<Mascota>) listadoMascotas;
	}
	
	public ArrayList<String> getTipoMascotasEnVenta() {		
		return (ArrayList<String>) mascotaDaoImpl.getTipoMascotasEnVenta();
	}
	
	public Mascota saveMascota(Mascota mascota) {
		return mascotaDaoImpl.save(mascota);
	}
	
	public Mascota actualizarMascota(long idUsuarioLogado, Mascota mascotaActualizar) {
		Mascota mascotaActualizada = null;
		
		Usuario usuarioLogado = this.usuarioDaoImpl.getUsuario(idUsuarioLogado);
		if (usuarioLogado != null) {
			mascotaActualizada = mascotaDaoImpl.save(mascotaActualizar);
		}
		
		return mascotaActualizada;
	}
	
	public Mascota getMascota(long idMascota) {
		return mascotaDaoImpl.getMascota(idMascota);
	}
	
	public void eliminarMascota(long idUsuarioLogado, long idMascotaBorrar) {
		Usuario usuarioLogado = this.usuarioDaoImpl.getUsuario(idUsuarioLogado);
		if (usuarioLogado != null) {
			Mascota mascotaBorrar = this.mascotaDaoImpl.getMascota(idMascotaBorrar);
			if (mascotaBorrar != null) {
				mascotaDaoImpl.delete(mascotaBorrar);
			}
		}
	}
}
