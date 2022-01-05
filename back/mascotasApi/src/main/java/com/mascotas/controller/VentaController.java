package com.mascotas.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mascotas.model.Venta;
import com.mascotas.pojo.VentaListado;
import com.mascotas.service.VentaService;

@RestController
@RequestMapping("/venta")
public class VentaController {
	@Autowired
	VentaService ventaService;
	
	@PostMapping()
	public Venta guardarVenta(
			@RequestBody Venta venta) {
		return this.ventaService.guardarVenta(venta);
	}
	
	@GetMapping("/ventas")
	public ArrayList<VentaListado> getVentas() {
		return ventaService.getVentas();
	}
	
	@GetMapping("/importeTotalVentas") 
	public double getImporteTotalVentas() {
		return ventaService.getImporteTotalVentas();
	}
}
