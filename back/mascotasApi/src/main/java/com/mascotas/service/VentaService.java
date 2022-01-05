package com.mascotas.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mascotas.model.Comprador;
import com.mascotas.model.Mascota;
import com.mascotas.model.Usuario;
import com.mascotas.model.Venta;
import com.mascotas.pojo.VentaListado;
import com.mascotas.repository.CompradorDao;
import com.mascotas.repository.MascotaDao;
import com.mascotas.repository.UsuarioDao;
import com.mascotas.repository.VentaDao;
import com.mascotas.sorter.FechaSorter;

@Service
public class VentaService {
	@Autowired
	CompradorDao compradorDaoImpl;
	@Autowired
	MascotaDao mascotaDaoImpl;
	@Autowired
	UsuarioDao usuarioDaoImpl;
	@Autowired
	VentaDao ventaDaoImpl;
	
	public Venta guardarVenta(Venta venta) {
		return ventaDaoImpl.save(venta);
	}
	
	public ArrayList<VentaListado> getVentas() {
		List<VentaListado> ventasListado = null;
		List<Venta> ventas = (ArrayList<Venta>) ventaDaoImpl.findAll();
		if (ventas != null && !ventas.isEmpty()) {
			// Se ordenan las ventas de la más reciente a la más antigua.
			ventas.sort(new FechaSorter());
			
			Iterator<Venta> itVentas = ventas.iterator();
			while(itVentas.hasNext()) {
				Venta ventaActual = itVentas.next();
				VentaListado ventaListadoActual = new VentaListado();
				ventaListadoActual.setId(ventaActual.getId());
				
				/* Se recuperan los datos del comprador de la mascota */
				Comprador compradorActual = compradorDaoImpl.getComprador(ventaActual.getIdComprador());
				if (compradorActual != null) {
					ventaListadoActual.setComprador(
							((compradorActual.getNombre() != null) ? compradorActual.getNombre() : "") + " "
							+ ((compradorActual.getApellidos() != null) ? compradorActual.getApellidos() : "")
							);
				}
				
				/* Se recuperan los datos de la mascota */
				Mascota mascotaActual = mascotaDaoImpl.getMascota(ventaActual.getIdMascota());
				if (mascotaActual != null) {
					ventaListadoActual.setMascota(
							((mascotaActual.getNombre() != null) ? mascotaActual.getNombre() : "") + " "
							+ ((mascotaActual.getTipo() != null) ? "(" + mascotaActual.getTipo() + ")" : "")
							);
					ventaListadoActual.setPrecio(mascotaActual.getPrecio());
				}	
				
				/* Se recuperan los datos del vendedor */
				Usuario vendedorActual = usuarioDaoImpl.getUsuario(ventaActual.getIdVendedor());
				if (vendedorActual != null) {
					ventaListadoActual.setVendedor(
							((vendedorActual.getNombre() != null) ? vendedorActual.getNombre() : "") + " "
							+ ((vendedorActual.getApellidos() != null) ? vendedorActual.getApellidos() : "")
							);
				
				}
				ventaListadoActual.setFecha(ventaActual.getFecha());
				if (ventasListado == null) {
					ventasListado = new ArrayList<>();
				}
				ventasListado.add(ventaListadoActual);
			}
		}
		
		return (ArrayList<VentaListado>) ventasListado;
	}
	
	public double getImporteTotalVentas() {
		double total = 0;
		List<VentaListado> listadoVentas = this.getVentas();
		Iterator<VentaListado> itListadoVentas = listadoVentas.iterator();
		while (itListadoVentas.hasNext()) {
			VentaListado ventaActual = itListadoVentas.next();
			total = total + ventaActual.getPrecio();
		}
		return total;
	}
}
