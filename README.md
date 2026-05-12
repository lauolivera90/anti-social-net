# 🌐 Antisocial Net - VisualLayer

**AntiSocial Net** es una plataforma de microblogging inspirada en la experiencia de usuario y el diseño visual de redes sociales modernas como X (anteriormente Twitter). 

Este repositorio contiene el **Frontend** del proyecto, desarrollado bajo un enfoque estricto de arquitectura modular y *Dark Mode First*.

## 📖 Contexto del Proyecto

Este software nace como un **proyecto integrador universitario** para la materia *"Construcción de interfaces de usuario"*. Su propósito es estrictamente académico, educativo y sin fines de lucro.

**Objetivos de aprendizaje alcanzados:**
- Consumo robusto de APIs RESTful.
- Manejo avanzado de estados globales y locales en React.
- Implementación de la arquitectura escalable **Feature-Sliced Design (FSD)**.
- Diseño de componentes UI inteligentes (Detección de colisiones, *Lazy Loading*, modales dinámicos).
- Interfaz 100% responsiva (Desktop & Mobile-first Navigation).

## 🚀 Aplicación Desplegada (Live Demo)
Puedes explorar y probar la plataforma en vivo ingresando al siguiente enlace:
**[https://anti-social-net.vercel.app/home](https://anti-social-net.vercel.app/home)**

## 📜 Scripts Disponibles (`package.json`)
Si deseas clonar el proyecto para desarrollo, estos son los comandos principales disponibles:

- `npm run dev`: Inicia el servidor de desarrollo local con Vite (incluye recarga en caliente / HMR).
- `npm run build`: Compila la aplicación y optimiza los archivos (minificación y bundling) para producción en la carpeta `dist`.
- `npm run lint`: Ejecuta el linter (ESLint) para verificar la calidad del código, asegurando buenas prácticas y detectando errores de sintaxis.
- `npm run preview`: Inicia un servidor web local liviano para previsualizar el contenido compilado en `dist` antes de subirlo a producción.

# 🛠️ Tecnologías utilizadas
Core: React.js & Vite (para un bundling ultrarrápido).

UI/UX: React Bootstrap, Bootstrap CSS e Icons.

Comunicación: Fetch API / Axios para el consumo de la API REST (desarrollada por el grupo de backend *Semáforos en Rojo* alojada en Render).

Arquitectura: **Feature-Sliced Design (FSD)** estructurado en capas jerárquicas.

# 🌐 Funcionalidades Clave
Gestión de Usuarios: Registro, Login y edición de perfil.

Integridad de Datos: Eliminación de cuenta en cascada (borra publicaciones y comentarios asociados).

Feed Dinámico: Creación de posts, visualización completa y sistema de comentarios.

Exploración: Filtro avanzado de publicaciones mediante etiquetas (tags).

Configuración: Panel de ajustes de usuario personalizado.

# 🧑‍💻 Equipo VisualLayer
Federico González

Federico Labriola

Martin Lubris Vadell

Lautaro B. Olivera

💡 Este proyecto forma parte de la materia "Construccion de interfaces de usuario" de la Tecnicatura en Programación (UNAHUR).
