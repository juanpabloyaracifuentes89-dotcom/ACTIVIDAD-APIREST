-- =============================================================
-- BASE DE DATOS: inventarios_db
-- =============================================================

CREATE DATABASE IF NOT EXISTS inventarios_db;
USE inventarios_db;

-- 1. TABLA: estados_equipos
CREATE TABLE IF NOT EXISTS estados_equipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estado VARCHAR(20) NOT NULL, -- Activo / Inactivo
    fecha_creacion DATETIME,
    fecha_actualizacion DATETIME
);

-- 2. TABLA: marcas
CREATE TABLE IF NOT EXISTS marcas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estado VARCHAR(20) NOT NULL, -- Activo / Inactivo
    fecha_creacion DATETIME,
    fecha_actualizacion DATETIME
);

-- 3. TABLA: tipos_equipos
CREATE TABLE IF NOT EXISTS tipos_equipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estado VARCHAR(20) NOT NULL, -- Activo / Inactivo
    fecha_creacion DATETIME,
    fecha_actualizacion DATETIME
);

-- 4. TABLA: usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL, -- ADMINISTRADOR / DOCENTE
    fecha_creacion DATETIME,
    fecha_actualizacion DATETIME,
    CONSTRAINT chk_rol CHECK (rol IN ('ADMINISTRADOR', 'DOCENTE'))
);

-- 5. TABLA: inventarios
CREATE TABLE IF NOT EXISTS inventarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    serial VARCHAR(50) NOT NULL UNIQUE,
    modelo VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    foto VARCHAR(255),
    color VARCHAR(50),
    fecha_compra DATETIME,
    precio DOUBLE NOT NULL,
    usuario_id INT NOT NULL,
    marca_id INT NOT NULL,
    estado_equipo_id INT NOT NULL,
    tipo_equipo_id INT NOT NULL,
    fecha_creacion DATETIME,
    fecha_actualizacion DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (marca_id) REFERENCES marcas(id),
    FOREIGN KEY (estado_equipo_id) REFERENCES estados_equipos(id),
    FOREIGN KEY (tipo_equipo_id) REFERENCES tipos_equipos(id)
);


-- =============================================================
-- REQUERIMIENTO 6: SCRIPT SQL DE ALTERACIÓN (Por si ya existía la tabla)
-- =============================================================
-- Si ya contabas con la tabla usuarios creada previamente sin estos campos,
-- ejecuta las siguientes líneas para alterarla y añadir la seguridad:

-- ALTER TABLE usuarios ADD COLUMN password VARCHAR(255) NOT NULL;
-- ALTER TABLE usuarios ADD COLUMN rol VARCHAR(50) NOT NULL;
-- ALTER TABLE usuarios ADD CONSTRAINT chk_rol CHECK (rol IN ('ADMINISTRADOR', 'DOCENTE'));


-- =============================================================
-- INSERT DE DATOS INICIALES (Con contraseñas cifradas con BCrypt)
-- Contraseña de prueba para ambos usuarios: "password123"
-- Hash de BCrypt generado para "password123": $2a$10$tMhI6958GZ5rPshA1v830unXbYF3f8iL5y8h9yI51tX3127pWw1hC
-- =============================================================

-- Limpiar datos para pruebas limpias
DELETE FROM inventarios;
DELETE FROM usuarios;
DELETE FROM marcas;
DELETE FROM tipos_equipos;
DELETE FROM estados_equipos;

-- 1. Insertar Usuarios por Defecto
INSERT INTO usuarios (id, nombre, email, password, rol, fecha_creacion, fecha_actualizacion) VALUES
(1, 'Administrador Sistema', 'admin@proyecto.com', '$2a$10$tMhI6958GZ5rPshA1v830unXbYF3f8iL5y8h9yI51tX3127pWw1hC', 'ADMINISTRADOR', NOW(), NOW()),
(2, 'Docente Juan', 'docente@proyecto.com', '$2a$10$tMhI6958GZ5rPshA1v830unXbYF3f8iL5y8h9yI51tX3127pWw1hC', 'DOCENTE', NOW(), NOW());

-- 2. Insertar Marcas
INSERT INTO marcas (id, nombre, estado, fecha_creacion, fecha_actualizacion) VALUES
(1, 'Dell', 'Activo', NOW(), NOW()),
(2, 'Sony', 'Activo', NOW(), NOW());

-- 3. Insertar Tipos de Equipos
INSERT INTO tipos_equipos (id, nombre, estado, fecha_creacion, fecha_actualizacion) VALUES
(1, 'Computo', 'Activo', NOW(), NOW()),
(2, 'Proyectores', 'Activo', NOW(), NOW());

-- 4. Insertar Estados de Equipos
INSERT INTO estados_equipos (id, nombre, estado, fecha_creacion, fecha_actualizacion) VALUES
(1, 'Disponible', 'Activo', NOW(), NOW()),
(2, 'En Soporte', 'Activo', NOW(), NOW());

-- 5. Insertar Inventario Inicial
INSERT INTO inventarios (id, serial, modelo, descripcion, foto, color, fecha_compra, precio, usuario_id, marca_id, estado_equipo_id, tipo_equipo_id, fecha_creacion, fecha_actualizacion) VALUES
(1, 'SRL12345', 'Latitude 5420', 'Portátil Dell asignado', 'http://foto.com/latitude.jpg', 'Gris', NOW(), 1200.0, 1, 1, 1, 1, NOW(), NOW());
