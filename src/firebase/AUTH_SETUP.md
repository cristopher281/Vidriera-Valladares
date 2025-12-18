# Configuración de Firebase Authentication

Esta guía te ayudará a configurar Firebase Authentication para que el sistema de login funcione correctamente.

---

## ⚠️ IMPORTANTE - Debes Completar Estos Pasos

Para que el login funcione, necesitas:

1. ✅ **Habilitar Email/Password en Firebase Console** (probablemente ya lo hiciste)
2. ✅ **Teléfono ya está habilitado** (según la captura que compartiste)
3. ❌ **Crear tu primer usuario administrador**

---

## Paso 1: Crear Usuario Administrador

### Opción A: Desde Firebase Console (Recomendado)

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto: **Vidrieria**
3. En el menú lateral: **Authentication** → **Users**
4. Haz clic en **Add user**
5. Ingresa:
   - **Email**: El email que usarás para entrar (ej: `admin@vidrieriavalladares.com`)
   - **Password**: Una contraseña segura (mínimo 6 caracteres)
6. Haz clic en **Add user**

**¡Listo!** Ya puedes usar ese email y contraseña para entrar al sistema.

---

### Opción B: Registro desde la App (Si quieres habilitar)

Actualmente la app NO tiene opción de registro. Si quieres agregar un botón de registro, puedo implementarlo. Sería solo para que TÚ puedas crear otros usuarios admin, no para usuarios públicos.

---

## Paso 2: Probar el Login

### Con Email:

1. Ejecuta la app: `npm run dev`
2. Ve a `/admin`
3. Debería mostrar el formulario de login nuevo
4. Ingresa el email y contraseña que configuraste
5. Haz clic en "Iniciar Sesión"
6. ✅ Deberías entrar al dashboard

---

### Con Teléfono:

1. En `/admin`, haz clic en **"Entrar con Teléfono"**
2. Ingresa el número de prueba: `+505 8357 4654`
3. Haz clic en "Enviar Código SMS"
4. Ingresa el código de prueba: `121212`
5. Haz clic en "Verificar Código"
6. ✅ Deberías entrar al dashboard

> **Nota:** El número de prueba `+505 8357 4654` NO envía SMS reales, solo funciona en desarrollo. Para usar números reales en producción, Firebase cobra por cada SMS enviado.

---

## Paso 3: Actualizar Reglas de Firestore

Ahora que tienes autenticación real, actualiza las reglas de Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Productos - lectura pública, escritura solo autenticados
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /woodProducts/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /rawMaterials/{materialId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**Cómo actualizar:**
1. Firebase Console → Firestore Database
2. Tab **Rules**
3. Copia y pega las reglas de arriba
4. Haz clic en **Publish**

---

## Recuperación de Contraseña

Si olvidas tu contraseña:

1. En el login, haz clic en **"¿Olvidaste tu contraseña?"**
2. Ingresa tu email
3. Firebase te enviará un email con un link
4. Haz clic en el link del email
5. Ingresa tu nueva contraseña
6. ¡Listo!

---

## Diferencias con el Sistema Anterior

| Característica | Antes | Ahora |
|----------------|-------|-------|
| **Login** | admin/admin (hardcoded) | Email/Password o Teléfono/SMS |
| **Seguridad** | ❌ Cualquiera con el código | ✅ Solo usuarios en Firebase |
| **Recuperación** | ❌ No disponible | ✅ Por email |
| **Persistencia** | localStorage | Firebase Auth (más seguro) |
| **Multi-dispositivo** | ❌ No sincroniza | ✅ Sesión en todos los dispositivos |

---

## Troubleshooting

### Error: "No user found with this email"
- **Causa:** No has creado el usuario en Firebase Console
- **Solución:** Sigue el Paso 1 arriba

### Error: "Wrong password"
- **Causa:** Contraseña incorrecta
- **Solución:** Usa recuperación de contraseña O verifica en Firebase Console

### Error: "Invalid phone number"
- **Causa:** Formato de número incorrecto
- **Solución:** Asegúrate de incluir el código de país: `+505 XXXX XXXX`

### No recibo el código SMS
- **Causa:** Estás usando un número real sin configuración de producción
- **Solución:** Usa el número de prueba `+505 8357 4654` con código `121212`

### Error: "PERMISSION_DENIED" en Firestore
- **Causa:** Las reglas de Firestore no están actualizadas
- **Solución:** Actualiza las reglas según el Paso 3

---

## Próximos Pasos Opcionales

### 1. Agregar más administradores
- Puedes crear más usuarios desde Firebase Console (Paso 1)
- O puedo agregar un botón de "Registrar Admin" en la app

### 2. Personalizar emails de Firebase
- Firebase Console → Authentication → Templates
- Personaliza los mensajes de recuperación de contraseña

### 3. Configurar dominio de email personalizado
- Para que los emails vengan de `@tudominio.com` en lugar de `@firebaseapp.com`
- Requiere configuración avanzada

---

## ✅ Checklist de Configuración

- [ ] He creado mi usuario administrador en Firebase Console
- [ ] Probé login con email y funciona
- [ ] (Opcional) Probé login con teléfono y funciona
- [ ] Actualicé las reglas de Firestore para requerir autenticación
- [ ] Probé que puedo crear/editar productos después de logearme

---

**¿Necesitas ayuda con alguno de estos pasos?** Déjame saber y te ayudo.
