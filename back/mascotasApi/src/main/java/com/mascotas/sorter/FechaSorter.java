package com.mascotas.sorter;

import java.util.Comparator;

import com.mascotas.model.Venta;

public class FechaSorter implements Comparator<Venta> {
	 @Override
	    public int compare(Venta v1, Venta v2) {
	        return (v1.getFecha().getTime() >= v2.getFecha().getTime() ? -1 : 1); // Ordenar por fecha descendiente
	    //  return (v1.getFecha().getTime() > v2.getFecha().getTime() ? 1 : -1); // Ordenar por fecha ascendente
	 }
}
