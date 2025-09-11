# Turismo Lobería - Frontend React

Este proyecto es el frontend de un sitio turístico para el partido de Lobería (Provincia de Buenos Aires), desarrollado en **React**. Incluye componentes de navegación, footer, clima, buscador con sugerencias, descarga de archivos y seguimiento de eventos con Google Analytics 4.

---

## 📁 Estructura de carpetas
src/

├─ assets/ # Imágenes, íconos y logos

├─ components/

│ ├─ cards/ # Componentes de tipo card (WeatherCardCompact, etc.)

│ ├─ common/ # Helpers y utilidades compartidas

│ ├─ buttons/ # Botones especiales (DownloadButton)

│ ├─ Navbar/ # Componente Header/Navbar

│ ├─ Footer/ # Componente Footer

│ ├─ WeatherCarousel/ # Carrusel de clima

├─ helpers/ # Helpers globales

│ └─ Global.js

├─ analytics/ # Google Analytics 4

│ └─ ga.js

├─ styles/ # CSS/SCSS globales

├─ App.js

├─ index.js

└─ i18n.js # Configuración de react-i18next


---

## 🔧 Instalación

# 1. Clonar el repositorio:

```bash
git clone https://github.com/Luca1008/Turismo-Loberia.git
cd turismoloberia

2. Instalar dependencias
npm install

3. Ejecutar la aplicación:
npm run dev
```

# 2. Dependencias principales

* React 18

* react-router-dom 6

* react-icons

* axios

* react-i18next

* bootstrap

* typewriter-effect

* react-ga4


# Funcionalidades principales
1. Header / Navbar

* Navegación principal con enlaces a secciones y submenús desplegables.

* Cambio de idioma (ES / EN) usando react-i18next.

* Buscador de contenidos con sugerencias dinámicas.

* Menú responsive para desktop y dispositivos móviles.

* Integración con Google Analytics para rastreo de clics.

* Clima de Localidades.

2. Footer

Contiene logo, enlaces de contacto, dirección y redes sociales.

Componente responsive.

Seguimiento de eventos en enlaces con Google Analytics.

Cambia el idioma automáticamente según selección del usuario.

3. WeatherCarousel

Carrusel de clima para varias localidades.

Consulta datos de clima desde API definida en Global.url.

Pausa automática al pasar el mouse por encima.

Cada tarjeta muestra ciudad, temperatura, ícono y descripción del clima.

Soporta múltiples ubicaciones configurables.

4. DownloadButton

Botón reutilizable para descargar archivos.

Configurable: filePath, fileName, label y className.

Ícono de descarga integrado con react-icons.

5. Buscador con sugerencias

Filtra resultados por título y categoría.

Autocompletado dinámico basado en contenido disponible.

Compatible con desktop y mobile.

Permite navegar directamente a la página de resultados.

6. Google Analytics 4

Inicialización de GA con ReactGA.

Seguimiento de páginas (trackPageview) y eventos (trackEvent).

Integración en botones, enlaces y cambios de idioma.

Permite análisis de interacción de usuarios.

7. Internacionalización

Traducciones usando react-i18next.

Todos los textos clave, menús y etiquetas son traducibles.

Cambio dinámico de idioma desde Navbar y Footer.

8. Panel Admin

Panel de administración para crear, editar y eliminar contenido. Además de editar y crear información de editores.

📝 Notas importantes

Todos los componentes son responsivos y adaptativos para dispositivos móviles.

La API de clima debe estar disponible en la URL definida en Global.url.

Se recomienda ejecutar la aplicación en un entorno local para pruebas de GA antes de producción.

Las rutas y enlaces están gestionados con react-router-dom 6.

👨‍💻 Autores

Felicitas Aguerralde

Luca Guidi

📄 Licencia

Este proyecto está bajo la licencia MIT.

 * Componente `Readme`
 * Readme de la aplicación
 * @component
 * @author Felicitas Aguerralde
 * @author Luca Guidi
 * @returns {JSX.Element}

## Documentación: JSDoc con Minami