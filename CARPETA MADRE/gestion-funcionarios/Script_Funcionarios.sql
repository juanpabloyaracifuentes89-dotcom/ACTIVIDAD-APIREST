-- =====================================
-- CREACIÓN DE LA BASE DE DATOS
-- =====================================
CREATE DATABASE gestion_funcionarios;
USE gestion_funcionarios;

-- =====================================
-- CREACIÓN DE LAS TABLAS
-- =====================================
-- =====================================
-- TABLA DEPARTAMENTOS
-- =====================================
CREATE TABLE departamentos (
    id_departamento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- =====================================
-- TABLA CARGOS
-- =====================================
CREATE TABLE cargos (
    id_cargo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    salario_base DECIMAL(10,2) NOT NULL
);

-- ======================
-- TABLA TIPO DE DOCUMENTO
-- ======================
CREATE TABLE tipos_documento (
    id_tipo_documento INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL
);

-- ===========================================
-- TABLA FUNCIONARIOS (TABLA CENTRAL DEL CRUD)
-- ===========================================
CREATE TABLE funcionarios (
    id_funcionario INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    numero_documento VARCHAR(20) UNIQUE NOT NULL,
    id_tipo_documento INT NOT NULL,
    correo VARCHAR(150),
    telefono VARCHAR(20),
    direccion VARCHAR(150),
    fecha_ingreso DATE NOT NULL,
    id_departamento INT,
    id_cargo INT,
    estado BOOLEAN DEFAULT TRUE,

    -- RELACIONES
    FOREIGN KEY (id_tipo_documento) REFERENCES tipos_documento(id_tipo_documento),
    FOREIGN KEY (id_departamento) REFERENCES departamentos(id_departamento),
    FOREIGN KEY (id_cargo) REFERENCES cargos(id_cargo)
);

-- ======================
-- REGISTROS
-- ======================

-- TIPOS DE DOCUMENTO
INSERT INTO tipos_documento (descripcion) VALUES
('Cédula de ciudadanía'),
('Cédula de extranjería'),
('Pasaporte');

-- DEPARTAMENTOS
INSERT INTO departamentos (nombre) VALUES
('Recursos Humanos'),
('Tecnología'),
('Finanzas'),
('Logística');

-- CARGOS
INSERT INTO cargos (nombre, salario_base) VALUES
('Analista', 2500000),
('Desarrollador', 4000000),
('Contador', 3000000),
('Coordinador', 4500000);

-- FUNCIONARIOS
INSERT INTO funcionarios 
(nombres, apellidos, numero_documento, id_tipo_documento, correo, telefono, direccion, fecha_ingreso, id_departamento, id_cargo, estado)
VALUES
('Juan', 'Pérez', '1001234567', 1, 'juan.perez@empresa.com', '3001234567', 'Calle 10 #20-30', '2022-01-15', 2, 2, TRUE),
('María', 'Gómez', '1009876543', 1, 'maria.gomez@empresa.com', '3019876543', 'Carrera 50 #40-20', '2021-06-10', 1, 4, TRUE),
('Carlos', 'Rodríguez', '1023456789', 1, 'carlos.rodriguez@empresa.com', '3023456789', 'Av Siempre Viva 123', '2023-03-01', 3, 3, TRUE),
('Ana', 'Martínez', '1098765432', 1, 'ana.martinez@empresa.com', '3038765432', 'Calle 80 #15-60', '2020-11-25', 4, 1, TRUE);

-- =====================================
-- TABLA USUARIOS (PARA AUTENTICACIÓN)
-- =====================================
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL CHECK (rol IN ('ADMINISTRADOR', 'DOCENTE'))
);

-- =====================================
-- INSERCIÓN DE USUARIOS DE PRUEBA (Contraseña: "password123")
-- =====================================
INSERT INTO usuarios (nombre, email, password, rol) VALUES
('Administrador', 'admin@empresa.com', '$2a$10$tMhI6958GZ5rPshA1v830unXbYF3f8iL5y8h9yI51tX3127pWw1hC', 'ADMINISTRADOR'),
('Docente', 'docente@empresa.com', '$2a$10$tMhI6958GZ5rPshA1v830unXbYF3f8iL5y8h9yI51tX3127pWw1hC', 'DOCENTE');
