package com.mascotas.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="venta")
public class Venta {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(unique = true, nullable = false)
	private Long id;
	private Long idcomprador;
	private Long idmascota;
	private Long idvendedor;
	private Date fecha;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getIdComprador() {
		return idcomprador;
	}
	
	public void setIdComprador(Long idComprador) {
		this.idcomprador = idComprador;
	}
	
	public Long getIdMascota() {
		return idmascota;
	}
	
	public void setIdMascota(Long idMascota) {
		this.idmascota = idMascota;
	}
	
	public Long getIdVendedor() {
		return idvendedor;
	}
	
	public void setIdVendedor(Long idVendedor) {
		this.idvendedor = idVendedor;
	}
	
	public Date getFecha() {
		return fecha;
	}
	
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
}
