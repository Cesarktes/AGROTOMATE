# AGROTOMATE
PROYECTO SENA 2026 GRUPO 1

  Lina Yurani Cardozo Ferreira
  Jaider Giraldo Arcila
  Diego Alejandro Cruz Cepeda
  Cesar Augusto Cortes

# 🌱 Sistema de Gestión AgroTomate FQ

## 📌 Descripción

AgroTomate FQ es un sistema web desarrollado para la gestión administrativa de una empresa comercializadora de productos agrícolas.  
Permite administrar inventario, clientes, proveedores, usuarios y registrar operaciones de venta y compra.

Proyecto desarrollado como evidencia académica para el programa:

**Técnico en Procesamiento de Pruebas de Software – SENA**

---

# 🎯 Objetivo del Proyecto

Desarrollar un sistema de información web que permita:

- Gestionar productos y controlar inventario
- Administrar clientes y proveedores
- Gestionar usuarios con roles
- Registrar ventas (salidas)
- Registrar compras (entradas)
- Aplicar arquitectura cliente-servidor

---

# 🏗️ Arquitectura del Sistema

El sistema está dividido en:

## 🔹 Backend

Desarrollado con:

- Spring Boot 3
- Spring Data JPA
- Spring Security
- Java 21
- Maven

Arquitectura en capas:

Controlador → Servicio → Repositorio → Base de Datos

---

## 🔹 Frontend

Desarrollado con:

- React
- React Router DOM
- Axios
- Bootstrap

Arquitectura basada en componentes funcionales y Hooks (`useState`, `useEffect`).

---

# 🗄️ Base de Datos

- Motor: MySQL 8.0
- Base de datos: `agroinvent_db`

Tablas principales:

- productos
- clientes
- proveedores
- usuarios
- salidas (ventas)
- entradas (compras)

---

# 🔐 Seguridad

- Autenticación mediante endpoint `/auth/login`
- Encriptación de contraseñas con BCrypt
- Manejo de sesión con LocalStorage
- Control de acceso por roles en frontend

Roles implementados:

- ADMIN
- EMPLEADO

---

# 📦 CRUD Implementados

## 📦 Gestión de Productos
- Crear producto  
- Listar productos  
- Editar producto  
- Eliminar producto  
- Control automático de stock  

## 👤 Gestión de Clientes
- Crear cliente  
- Listar clientes  
- Editar cliente  
- Eliminar cliente  

## 🚚 Gestión de Proveedores
- Crear proveedor  
- Listar proveedores  
- Editar proveedor  
- Eliminar proveedor  

## 👥 Gestión de Usuarios
- Crear usuario  
- Listar usuarios  
- Editar usuario  
- Eliminar usuario  
- Asignar rol (ADMIN / EMPLEADO)  
- Autenticación de usuarios  

---

# 📋 Requisitos Previos

Antes de ejecutar el proyecto, asegúrese de tener instalado:

- Java 21
- Node.js 18 o superior
- MySQL 8.0
- Maven
- Git (opcional)

---

# 🛠️ Entorno de Desarrollo

El proyecto fue desarrollado utilizando:

- IntelliJ IDEA 2021
- Eclipse Temurin JDK 21.0.8
- MySQL Workbench 8.0
- Node.js 18+

---

# ⚙️ Instalación y Ejecución

## 🔹 Backend

1. Crear la base de datos en MySQL:

CREATE DATABASE agroinvent_db;

2. Configurar credenciales en el archivo `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/agroinvent_db
spring.datasource.username=TU_USUARIO
spring.datasource.password=TU_CONTRASEÑA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

3. Ejecutar la aplicación backend:

```bash
mvn spring-boot:run
```

Servidor disponible en:

```
http://localhost:8080
```

---

## 🔹 Frontend

4. Ingresar a la carpeta del frontend:

```bash
cd inv-agrotomate-app
```

Instalar dependencias:

```bash
npm install
```

Ejecutar la aplicación:

```bash
npm start
```

Aplicación disponible en:

```
http://localhost:3000
```
