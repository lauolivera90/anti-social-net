import { useEffect, useState, useRef } from 'react';
import { Form, Spinner } from "react-bootstrap";
import { DropDown } from '@/widget/ui'; // Usamos nuestro widget personalizado
import { TagBadge, getTags } from '@/entities/tag'; // Importación limpia desde la entidad
import { useSmartDrop } from '@/shared/hook/useSmartDrop';

export const SelectTagsAction = ({ selectedTags, setSelectedTags }) => {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const triggerRef = useRef(null);
  const smartDrop = useSmartDrop(triggerRef, 250); // 250px por su maxHeight interno

  // Lógica de carga de datos delegada a la entidad
  useEffect(() => {
    const loadTags = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getTags();
        setTags(data);
      } catch (error) {
        console.error(error.message);
        setError("No se pudieron cargar las etiquetas.");
      } finally {
        setIsLoading(false);
      }
    };

    loadTags();
  }, []);

  const toggleTag = (tagId) => {
    const isSelected = selectedTags.some(t => t._id === tagId);
    
    if (isSelected) {
      setSelectedTags(selectedTags.filter(t => t._id !== tagId));
    } else {
      const fullTag = tags.find(t => t._id === tagId);
      if (fullTag) {
        setSelectedTags([...selectedTags, fullTag]);
      }
    }
  };

  return (
    <DropDown
      drop={smartDrop}
      variant="slate"
      menuClassName="p-3 mt-1" // Añadimos padding al menú
      trigger={
        <div ref={triggerRef} className="interactive-item rounded-pill p-2 d-flex">
          <i
            className="bi bi-tag-fill fs-5 icon-grow py-1 px-2"
            role="button"
            title="Agregar etiquetas"
          ></i>
        </div>
      }
    >
      {/* Pasamos el contenido personalizado como `children` */}
      <div style={{ maxHeight: '200px', overflowY: 'auto', minWidth: '256px' }}>
        {isLoading ? (
          <div className="text-center p-3">
            <Spinner animation="border" size="sm" variant="primary" />
          </div>
        ) : error ? (
          <div className="text-danger small px-2">{error}</div>
        ) : (
          tags.map((tag) => (
            // Reemplazamos Form.Check por una estructura manual para controlar el área de click
            <div
              key={tag._id}
              onClick={() => toggleTag(tag._id)}
              className="interactive-item d-flex align-items-center rounded-pill px-3 py-2 mb-1 me-2"
              style={{ cursor: 'pointer' }}
            >
              <Form.Check.Input
                type="checkbox"
                checked={selectedTags.some(t => t._id === tag._id)}
                // Hacemos que el input sea de solo lectura y el onChange esté vacío
                // porque la lógica de cambio está en el div contenedor.
                readOnly
                onChange={() => {}}
              />
              <TagBadge className={"ms-2 text-white"} name={tag.name} />
            </div>
          ))
        )}
      </div>
    </DropDown>
  );
};