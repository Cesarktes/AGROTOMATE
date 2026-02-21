# AGROTOMATE
PROYECTO SENA 2026

# 🌱 Sistema de Gestión AgroTomate 

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

El sistema cuenta con operaciones CRUD completas para las siguientes entidades:

---

## 📦 1. Gestión de Productos

Permite:

- ✔ Crear producto
- ✔ Listar productos
- ✔ Editar producto
- ✔ Eliminar producto
- ✔ Control de stock automático

Campos principales:
- Código
- Nombre
- Descripción
- Precio de venta
- Stock

---

## 👤 2. Gestión de Clientes

Permite:

- ✔ Crear cliente
- ✔ Listar clientes
- ✔ Editar cliente
- ✔ Eliminar cliente

Campos principales:
- Nombre
- Teléfono
- Email
- Dirección

---

## 🚚 3. Gestión de Proveedores

Permite:

- ✔ Crear proveedor
- ✔ Listar proveedores
- ✔ Editar proveedor
- ✔ Eliminar proveedor

---

## 👥 4. Gestión de Usuarios

Permite:

- ✔ Crear usuario
- ✔ Listar usuarios
- ✔ Editar usuario
- ✔ Eliminar usuario
- ✔ Asignar rol (ADMIN / EMPLEADO)
- ✔ Autenticación de usuarios

---

# 💰 Funcionalidades Adicionales

Además de los CRUD, el sistema incluye:

## 📊 Inventario
- Visualización de stock disponible
- Actualización automática tras ventas o compras

## 🛒 Ventas (Salidas)
- Registro de venta
- Descuento automático de stock
- Cálculo de valor total

## 🏬 Compras (Entradas)
- Registro de compra
- Incremento automático de stock

---

# ⚙️ Instalación y Ejecución

## 🔹 Backend

1. Crear base de datos:

```sql
CREATE DATABASE agroinvent_db;
