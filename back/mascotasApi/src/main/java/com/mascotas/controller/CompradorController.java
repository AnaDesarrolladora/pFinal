package com.mascotas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mascotas.model.Comprador;
import com.mascotas.service.CompradorService;

@RestController
@RequestMapping("/comprador")
public class CompradorController {
	@Autowired
	CompradorService compradorService;
	
	@GetMapping("/{dni}")
	public Comprador getComprador(
			@PathVariable("dni") String dniComprador) {
		return this.compradorService.getComprador(dniComprador);
	}
	
	@PostMapping()
	public Comprador guardarComprador(
			@RequestBody Comprador comprador) {
		return this.compradorService.guardarComprador(comprador);
	}
}
