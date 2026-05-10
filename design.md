# Design System: Hover Effects

Para mantener una consistencia visual a través de la aplicación, hemos estandarizado el efecto de `hover` para los elementos interactivos como botones, ítems de menú y enlaces de navegación.

## Estilo Visual

- **Fondo**: Un color de fondo semitransparente que utiliza el color secundario de Bootstrap (`--bs-secondary-rgb`) con una opacidad del 20%.
- **Forma**: Generalmente se aplica dentro de un contenedor con bordes redondeados (`rounded-pill` o `rounded-3`).
- **Transición**: Se utiliza una transición suave (`transition-all`) para la aparición y desaparición del fondo.

## Patrones de Implementación

Existen dos maneras de aplicar este efecto, dependiendo de la complejidad de la interacción.

### 1. Hover Simple (CSS)

Para casos sencillos donde el área clickeable y el área del efecto visual son la misma, se utiliza una clase CSS.

- **Clase**: `.interactive-item`
- **Uso**: Añade esta clase al componente de React o elemento HTML que debe reaccionar al `hover`.

**Ejemplo (`DropDown.jsx`):**
```jsx
<Dropdown.Item 
  className="interactive-item py-2 px-3 rounded-pill ..."
  onClick={...}
>
  ...
</Dropdown.Item>
```

### 2. Hover Complejo (JavaScript + CSS)

Para casos avanzados, como en el `Sidebar`, donde el área de detección del `hover` es más grande que el área del efecto visual, se utiliza una combinación de estado de React y una clase CSS.

- **Clase**: `.interactive-item-active`
- **Uso**:
    1.  En el componente padre, define un estado para rastrear el elemento sobre el cual está el cursor (ej: `const [hoveredItem, setHoveredItem] = useState(null);`).
    2.  En el contenedor ancho que detecta el evento, usa `onMouseEnter` y `onMouseLeave` para actualizar el estado.
    3.  En el elemento hijo que debe mostrar el feedback visual, aplica la clase `.interactive-item-active` condicionalmente basado en el estado.

**Ejemplo (`Sidebar.jsx`):**
```jsx
// Contenedor anfitrion que detecta el hover
<div 
  onMouseEnter={() => setHoveredItem('some-id')}
  onMouseLeave={() => setHoveredItem(null)}
>
  {/* Elemento visual que muestra el efecto */}
  <Row className={`... ${isHovered ? 'interactive-item-active' : ''}`}>
    ...
  </Row>
</div>
```

Este enfoque dual nos da la flexibilidad para crear interacciones complejas mientras mantenemos un estilo visual 100% consistente.

Especialización: ModalInput
1. Concepto
Es un wrapper del componente Input base diseñado para ser usado exclusivamente dentro de ModalCustom. No es un componente nuevo, sino una versión pre-configurada para el entorno de ventanas emergentes.

2. Ubicación
Se encuentra en: @/widget/ui

3. Justificación
Consistencia: Garantiza que todos los modales tengan el mismo estilo (fondo negro, bordes grises) sin repetir clases manualmente.

Mantenimiento: Cambiar el look de todos los formularios de configuración se hace desde un solo archivo.

Código Limpio: Reduce el ruido visual en las features al eliminar props de estilo repetitivas.

4. Cuándo usarlo
ModalInput: En todos los formularios dentro de un modal (Cambio de clave, Editar perfil, etc.).

Input (Base): En el feed principal (MakeComment), barras de búsqueda o páginas donde el diseño no sea el estándar de los modales.

5. Implementación
JavaScript
import { Input } from "./Input";

export const ModalInput = (props) => (
  <Input
    {...props}
    classNameControl={`bg-black text-white border-secondary ${props.classNameControl || ""}`}
    className={`mb-3 ${props.className || ""}`}
  />
);