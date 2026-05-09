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