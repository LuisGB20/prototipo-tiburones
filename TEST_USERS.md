# 👥 Usuarios de Prueba - MeXpace

## 📋 Cuentas Pre-configuradas

A continuación, las credenciales de usuarios ya creados en `SeedData.ts` que puedes usar para probar el sistema de autenticación:

---

## 🏢 Propietarios (OWNER)

### 1. Carlos Méndez
- **Email**: `carlos.mendez@email.com`
- **Contraseña**: `password123`
- **Espacios**: Cochera Techada Centro, Salón de Eventos Zona Hotelera

### 2. Ana Rodríguez
- **Email**: `ana.rodriguez@email.com`
- **Contraseña**: `password123`
- **Espacios**: Oficina Privada Ave Tulum, Estudio Fotográfico Profesional

### 3. Roberto Silva
- **Email**: `roberto.silva@email.com`
- **Contraseña**: `password123`
- **Espacios**: Pared para Mural Sm 23, Salón de Fiestas Jardín

### 4. Patricia Gómez
- **Email**: `patricia.gomez@email.com`
- **Contraseña**: `password123`
- **Espacios**: Cochera Descubierta Sm 44, Espacio Coworking Moderno

### 5. Miguel Torres
- **Email**: `miguel.torres@email.com`
- **Contraseña**: `password123`
- **Espacios**: Más espacios disponibles

---

## 🎒 Rentadores (RENTER)

### 1. Laura Martínez
- **Email**: `laura.martinez@email.com`
- **Contraseña**: `password123`
- **Reservas**: Múltiples rentas activas

### 2. Diego López
- **Email**: `diego.lopez@email.com`
- **Contraseña**: `password123`
- **Reservas**: Historial de rentas

### 3. Sofia Ramírez
- **Email**: `sofia.ramirez@email.com`
- **Contraseña**: `password123`
- **Reservas**: Rentas pasadas y futuras

### 4. Javier Hernández
- **Email**: `javier.hernandez@email.com`
- **Contraseña**: `password123`
- **Reservas**: Historial completo

---

## 🧪 Escenarios de Prueba

### Escenario 1: Login como Propietario
```
Email: carlos.mendez@email.com
Password: password123
Resultado: Acceso a /owner dashboard, puede ver "Mis Espacios"
```

### Escenario 2: Login como Rentador
```
Email: laura.martinez@email.com
Password: password123
Resultado: Acceso a /renter dashboard, puede ver "Mis Reservas"
```

### Escenario 3: Probar Protección de Rutas
```
1. Login como laura.martinez@email.com (RENTER)
2. Intentar acceder a http://localhost:5173/my-spaces
3. Resultado: Redirige a /unauthorized
```

### Escenario 4: Crear Nueva Cuenta
```
1. Ir a /register
2. Crear cuenta nueva con cualquier datos
3. Seleccionar rol (OWNER o RENTER)
4. Resultado: Auto-login y redirección a dashboard correspondiente
```

---

## 🔍 Verificar Datos Completos

Para ver todos los usuarios y sus datos completos, ir a:
- **URL**: `http://localhost:5173/debug`
- **Sección**: "Usuarios Registrados"

Esta página muestra en formato JSON todos los usuarios con sus espacios y rentas asociadas.

---

## 📝 Notas Importantes

1. **Contraseña Universal**: Todos los usuarios de prueba tienen la contraseña `password123`

2. **Datos Realistas**: Estos usuarios tienen:
   - Nombres y apellidos reales
   - Emails válidos
   - Espacios con ubicaciones reales en Cancún
   - Rentas con fechas pasadas, presentes y futuras
   - Reviews con comentarios detallados

3. **Crear Nuevos Usuarios**: Puedes crear tantos usuarios nuevos como necesites desde `/register`

4. **Reset de Datos**: Si quieres reset completo, ejecuta:
   ```javascript
   // En la consola del navegador:
   localStorage.clear()
   location.reload()
   ```
   Luego ve a `/debug` para reinicializar con seed data

---

## 🎯 Recomendaciones de Prueba

1. **Primero**: Probar login con usuarios existentes
2. **Segundo**: Crear cuenta nueva para probar registro
3. **Tercero**: Alternar entre cuentas OWNER y RENTER para ver diferencias
4. **Cuarto**: Intentar acceder a rutas protegidas con rol incorrecto
5. **Quinto**: Probar persistencia refrescando la página

---

## 🚀 Quick Start

**Inicio rápido en 3 pasos**:

1. Abrir `http://localhost:5173/login`
2. Usar: `carlos.mendez@email.com` / `password123`
3. Explorar el dashboard de propietario

**O**:

1. Abrir `http://localhost:5173/login`
2. Usar: `laura.martinez@email.com` / `password123`
3. Explorar el dashboard de rentador
