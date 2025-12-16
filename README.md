# 🪟 Vidriería Valladares - Sistema Web Completo

Sistema web profesional para vidriería con gestión de productos, inventario y presupuestos.

## 🚀 Características

✅ **Catálogo de Productos** - Visualización completa de productos con imágenes
✅ **Página "Nosotros"** - Información de la empresa, misión y visión
✅ **Página de Contacto** - Formulario de contacto y mapa de ubicación
✅ **Solicitud de Presupuestos** - Formulario detallado para cotizaciones
✅ **Panel de Administrador** - Gestión completa de productos e inventario
✅ **Carga de Imágenes** - Sistema de carga y compresión de imágenes
✅ **Almacenamiento Local** - Los datos persisten en localStorage

## 📦 Instalación

```bash
npm install
npm run dev
```

## 🔐 Acceso al Panel de Administrador

### Cómo acceder:
1. Ir a `/admin` o hacer clic en el enlace "🔐 Admin" en el footer
2. **Credenciales por defecto**:
   - Usuario: `admin`
   - Contraseña: `admin`

### Funcionalidades del Admin:
- ✏️ **Crear nuevos productos** con imágenes
- 📊 **Ver estadísticas** del inventario
- 🗑️ **Editar y eliminar** productos existentes
- 📸 **Subir imágenes** arrastrando archivos o haciendo clic
- ⚠️ **Alertas de stock bajo** (productos con menos de 10 unidades)

## 📄 Páginas Disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal con hero y productos destacados |
| `/catalog` | Catálogo completo de productos con búsqueda |
| `/about` | Información sobre la empresa |
| `/contact` | Formulario de contacto y ubicación |
| `/quote` | Solicitud de presupuesto personalizado |
| `/admin` | Panel de administración (requiere login) |
| `/admin/products` | Gestión de productos |
| `/admin/inventory` | Control de inventario |

## 🎨 Características Técnicas

- ⚛️ **React 18** con Vite
- 🎯 **React Router** para navegación
- 💾 **localStorage** para persistencia de datos
- 📸 **Compresión de imágenes** automática
- 🎨 **Diseño responsive** para móviles y desktop
- 🔒 **Autenticación simple** para administradores

## 📸 Gestión de Imágenes

El sistema incluye funcionalidades avanzadas para manejo de imágenes:

1. **Carga de archivos**: Arrastra y suelta o haz clic para seleccionar
2. **Compresión automática**: Las imágenes se comprimen a 800px de ancho
3. **Almacenamiento en Base64**: Las imágenes se guardan en localStorage
4. **Vista previa**: Ver la imagen antes de guardar

## 🛠️ Tecnologías Utilizadas

- React 18
- React Router DOM
- Vite
- CSS Modules
- LocalStorage API

## 📝 Notas Importantes

- Los datos se almacenan en `localStorage` del navegador
- Las imágenes se comprimen automáticamente para optimizar el rendimiento
- El sistema actualiza automáticamente productos con imágenes faltantes
- El acceso al admin es mediante credenciales simples (cambiar en producción)

## 🔄 Próximas Mejoras

- [ ] Backend real con base de datos
- [ ] Autenticación segura con JWT
- [ ] Pasarela de pago
- [ ] Sistema de notificaciones por email
- [ ] Galería de imágenes múltiples por producto
- [ ] Sistema de categorías dinámico

---

**Desarrollado para Vidriería Valladares** 🪟✨
