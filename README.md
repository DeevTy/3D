# 🌌 Noche Estrellada 3D - Deevty

## ✨ Descripción

Una experiencia web inmersiva que combina **Three.js** y **WebGL** para crear una noche estrellada realista en 3D. El proyecto incluye una luna detallada con cráteres, miles de estrellas parpadeantes, aurora boreal y efectos de partículas, todo renderizado en tiempo real.

## 🚀 Características Principales

### 🌙 **Luna 3D Realista**
- Esfera 3D con textura de cráteres generada dinámicamente
- Iluminación volumétrica con resplandor
- Rotación suave y efectos de superficie realistas

### ⭐ **Campo de Estrellas Inmersivo**
- **2,000 estrellas** distribuidas en una esfera 3D
- **5 colores diferentes**: blanco, cian, morado, verde neón, rosa
- Efecto de parpadeo dinámico con shaders personalizados
- Tamaños variables y movimiento orbital suave

### 🌈 **Aurora Boreal 3D**
- Shaders GLSL personalizados para ondas de colores
- Animación fluida con tres colores que se mezclan
- Efecto volumétrico que simula aurora real

### 💫 **Efectos Adicionales**
- 100 partículas flotantes que se reciclan
- Interactividad con parallax del mouse
- Animación CSS de código en tiempo real
- Diseño completamente responsivo

## 🛠️ Tecnologías Utilizadas

- **Three.js** - Renderizado 3D y WebGL
- **GLSL Shaders** - Efectos visuales personalizados
- **CSS3** - Animaciones y diseño responsivo
- **JavaScript ES6+** - Lógica de interactividad
- **HTML5 Canvas** - Renderizado de gráficos

## 📁 Estructura del Proyecto

```
LuTy/
├── index.html              # Página principal
├── styles/
│   └── main.css            # Estilos y animaciones CSS
├── scripts/
│   └── main.js             # Lógica JavaScript y Three.js
├── wireframes-*.md         # Documentación de wireframes
├── .gitignore              # Archivos ignorados por Git
└── README.md               # Este archivo
```

## 🎮 Instalación y Uso

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/DeevTy/3D.git
   cd 3D
   ```

2. **Abre el proyecto:**
   - Opción 1: Abre `index.html` directamente en tu navegador
   - Opción 2: Usa un servidor local (recomendado):
     ```bash
     # Con Python
     python -m http.server 8000
     
     # Con Node.js (npx)
     npx serve .
     
     # Con PHP
     php -S localhost:8000
     ```

3. **Visita:** `http://localhost:8000`

## ⚙️ Requisitos del Sistema

- **Navegador moderno** con soporte para WebGL 2.0
- **Hardware:** GPU con soporte para shaders
- **Recomendado:** Chrome, Firefox, Safari, Edge (últimas versiones)

## 🎨 Características Técnicas

### Renderizado 3D
- **WebGL 2.0** para máximo rendimiento
- **Shaders personalizados** optimizados
- **Culling de frustum** automático
- **Anti-aliasing** habilitado

### Optimización
- **60 FPS** estables en hardware moderno
- **Responsive design** para móviles y tablets
- **Carga progresiva** con overlay de loading
- **Memory management** eficiente

### Interactividad
- **Mouse parallax** para inmersión
- **Touch support** en dispositivos móviles
- **Redimensionado automático** de canvas
- **Animaciones fluidas** con requestAnimationFrame

## 🎯 Capturas de Pantalla

*[Agregar capturas de pantalla aquí]*

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Deevty** - *Desarrollo y Diseño*
- GitHub: [@DeevTy](https://github.com/DeevTy)

## 🙏 Agradecimientos

- [Three.js](https://threejs.org/) - Librería 3D increíble
- [WebGL](https://www.khronos.org/webgl/) - Estándar de gráficos web
- [MDN Web Docs](https://developer.mozilla.org/) - Documentación técnica

---

⭐ **¡Si te gustó este proyecto, dale una estrella!** ⭐ 