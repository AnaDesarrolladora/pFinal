/*
Crea la BBDD Casamascotas. Contendrá varias tablas.
*/

-- Crear una BBDD  para almacenar las tablas que se van a crear.
create database if not exists Casamascotas;

-- Se genera la tabla COMPRADOR
create table if not exists Casamascotas.COMPRADOR (
	id bigint not null unique auto_increment comment 'Identificador del comprador',
    dni varchar(250) comment 'Documento de identificación del comprador',
    nombre varchar(250) comment 'Nombre real del comprador',
    apellidos varchar(250) comment 'Apellidos del comprador',
    direccion varchar(250) comment 'Dirección del comprador',
    localidad varchar(250) comment 'Localidad del comprador',
    email varchar(250) comment 'E-mail del comprador',
    telefono varchar(250) comment 'Teléfono del comprador',
    primary key (id)
) ENGINE = INNODB;	

-- Se genera la tabla MASCOTA
create table if not exists Casamascotas.MASCOTA (
	id bigint not null unique auto_increment comment 'Identificador de la mascota',
    tipo varchar(250) comment 'Tipo de la mascota',
    nombre varchar(250) comment 'Nombre de la mascota',
    precio double comment 'Precio de la mascota',
    primary key (id)
) ENGINE = INNODB;	

INSERT INTO Casamascotas.MASCOTA (tipo, nombre, precio)
VALUES ('Gato', 'Botones', 600.48);
INSERT INTO Casamascotas.MASCOTA (tipo, nombre, precio)
VALUES ('Perro', 'Randy', 1257.8);

-- Se genera la tabla ROL
create table if not exists Casamascotas.ROL (
	id bigint not null unique auto_increment comment 'Identificador del rol de usuario de la aplicación',
    nombre varchar(250) not null comment 'Nombre del rol de usuario de la aplicación',
    primary key (id)
) ENGINE = INNODB;	

insert into Casamascotas.ROL (nombre) values
('Administrador'),
('Usuario');

-- Se genera la tabla USUARIO
create table if not exists Casamascotas.USUARIO (
	id bigint not null unique auto_increment comment 'Identificador del usuario',
    nombre varchar(250) comment 'Nombre real del usuario',
    apellidos varchar(250) comment 'Apellidos del usuario',
    telefono varchar(250) comment 'Teléfono del usuario',
    username varchar(6) unique comment 'Nombre del usuario en la aplicación',
    password varchar(12) comment 'Contraseña del usuario de la aplicación',
	rol bigint not null comment 'Rol del usuario de la aplicación',
    primary key (id)
) ENGINE = INNODB;	

INSERT INTO Casamascotas.USUARIO (nombre, apellidos, telefono, username, password, rol)
VALUES ('Administrador', 'que administra', '607000000', 'admon1', 'admon1', 1);
INSERT INTO Casamascotas.USUARIO (nombre, apellidos, telefono, username, password, rol)
VALUES ('otro user', 'user otro', '636000000', 'user01', 'user01', 1);

-- Se genera la tabla VENTA
create table if not exists Casamascotas.VENTA (
	id bigint not null unique auto_increment comment 'Identificador de la venta',
    idcomprador bigint not null comment 'Identificador del comprador de la mascota',
    idmascota bigint not null comment 'Identificador de la mascota',
	idvendedor bigint not null comment 'Identificador del usuario que vende la mascota',
    fecha datetime comment 'Fecha de la venta de la mascota',
    primary key (id)
) ENGINE = INNODB;	





