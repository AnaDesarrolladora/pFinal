package com.mascotas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mascotas.model.Comprador;
import com.mascotas.repository.CompradorDao;

@Service
public class CompradorService {
	@Autowired
	CompradorDao compradorDaoImpl;
	
	public Comprador getComprador(String dni) {
		return compradorDaoImpl.getComprador(dni);
	}
	
	public Comprador guardarComprador(Comprador comprador) {
		comprador.setDni(comprador.getDni().toUpperCase());
		comprador.setEmail(comprador.getEmail().toUpperCase());
		return compradorDaoImpl.save(comprador);
	}
}
