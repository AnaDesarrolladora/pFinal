package com.mascotas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class MascotasApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(MascotasApiApplication.class, args);
	}

}
