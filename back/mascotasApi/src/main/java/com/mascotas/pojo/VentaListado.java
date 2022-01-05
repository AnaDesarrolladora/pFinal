package com.mascotas.pojo;

import java.util.Date;

public class VentaListado {
	private Long id;
	private String comprador;
	private String mascota;
	private String vendedor;
	private Date fecha;
	private double precio;
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getId() {
		return this.id;
	}
	
	public void setComprador(String comprador) {
		this.comprador = comprador;
	}
	
	public String getComprador() {
		return this.comprador;
	}
	
	public void setMascota(String mascota) {
		this.mascota = mascota;
	}
	
	public String getMascota() {
		return this.mascota;
	}
	
	public void setVendedor(String vendedor) {
		this.vendedor = vendedor;
	}
	
	public String getVendedor() {
		return this.vendedor;
	}
	
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	
	public Date getFecha() {
		return this.fecha;
	}
	
	public void setPrecio(double precio) {
		this.precio = precio;
	}
	
	public double getPrecio() {
		return this.precio;
	}
}
