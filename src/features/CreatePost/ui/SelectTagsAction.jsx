import { useEffect, useState } from 'react';
import { Form } from "react-bootstrap";
import { DropDown } from '@/widget/ui'; // Usamos nuestro widget personalizado
import { TagBadge, fetchTags } from '@/entities/tag'; // Importación limpia desde la entidad

export const SelectTagsAction = ({ selectedTags, setSelectedTags }) => {
  const [tags, setTags] = useState([]);

  // Lógica de carga de datos delegada a la entidad
  useEffect(() => {
    const loadTags = async () => {
      try {
        const data = await fetchTags();
        setTags(data);
      } catch (error) {
        console.error(error.message);
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
      drop="down"
      variant="slate"
      menuClassName="p-3 mt-3" // Añadimos padding al menú
      trigger={
        <div className="interactive-item rounded-pill p-2 d-flex">
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
        {tags.length === 0 ? (
          <div className="text-secondary small px-2">Cargando etiquetas...</div>
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