import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/widget/ui';
import { getTags } from '@/entities/tag';
import { Spinner } from 'react-bootstrap';

// Componente interno para mostrar cada tendencia
const TrendItem = ({ tag }) => {
    const navigate = useNavigate();
    return (
        <div 
            className="py-2 px-2 rounded interactive-item" 
            role="button"
            onClick={() => navigate(`/search?tagId=${tag._id}`)}
        >
            <p className="text-secondary small mb-0">Tendencia</p>
            <p className="fw-bold text-white mb-0">#{tag.name}</p>
            {/* En una app real, la API devolvería el número de posts */}
            {/* <p className="text-secondary small">1,234 posts</p> */}
        </div>
    );
};

export const Trends = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const allTags = await getTags();
        // La lógica de "trending" debería estar en el backend.
        // Por ahora, solo mostramos los primeros 4.
        setTags(allTags.slice(0, 4));
      } catch (error) {
        console.error("Error al cargar las tendencias:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  return (
    <Card title="Tendencias para ti" hoverable={false} className="mb-4">
      {loading ? (
        <div className="text-center p-3">
          <Spinner animation="border" size="sm" variant="primary" />
        </div>
      ) : (
        <div className="mt-2">
          {tags.map(tag => <TrendItem key={tag._id} tag={tag} />)}
        </div>
      )}
    </Card>
  );
};

