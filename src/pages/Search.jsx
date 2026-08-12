import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Spinner, Row, Col, Form } from "react-bootstrap"; // O el tuyo de shared/ui
import { PostPreview } from "@/entities/post";
import { getPosts } from '@/entities/post';
import { PostActions } from "@/features/Post-Management/ui/PostActions";
import { Trends, RecommendedUsers } from '@/features/AsideSection/ui';
import { Input } from '@/widget/ui';

const Search = () => {
  const [busqueda, setBusqueda] = useState([]);
  const [tag, setTag] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q')?.trim() || '';
  const tagId = searchParams.get('tagId');
  const showAsideContent = !query && !tagId;

  useEffect(() => {
    setSearchTerm(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query && !tagId) {
        setBusqueda([]);
        setTag(null);
        return;
      }

      setLoading(true);
      try {
        if (tagId) {
          const posts = await getPosts({ tagId });
          setBusqueda(posts);
          if (posts.length > 0) {
            const foundTag = posts[0].tag.find(t => t._id === tagId);
            setTag(foundTag);
          } else {
            setTag(null);
          }
          return;
        }

        const allPosts = await getPosts();
        const normalizedQuery = query.toLowerCase();
        const queryWithoutHash = normalizedQuery.replace(/^#/, '');

        const filtered = allPosts.filter((post) => {
          const descriptionMatch = post.description?.toLowerCase().includes(normalizedQuery);
          const tagMatch = Array.isArray(post.tag) && post.tag.some((tagItem) => {
            const tagName = (tagItem.name || tagItem).toString().toLowerCase();
            return tagName.includes(queryWithoutHash);
          });
          return descriptionMatch || tagMatch;
        });

        setBusqueda(filtered);
        if (query.startsWith('#') && queryWithoutHash) {
          setTag({ name: queryWithoutHash });
        } else {
          setTag(null);
        }
      } catch (error) {
        console.error("Error en búsqueda:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, tagId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = searchTerm.trim();
    if (!trimmed) {
      setSearchParams({});
      return;
    }
    setSearchParams({ q: trimmed });
  };

  const headerTitle = tag
    ? `Resultados para #${tag.name}`
    : query
      ? `Resultados para ${query}`
      : "Explorar contenido";

  return (
    <div className="py-3 px-2">
      <header className="mb-4 border-bottom border-dark pb-3">
        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between gap-3">
          <div>
            <h4 className="fw-bold mb-2">{headerTitle}</h4>
          </div>
          <div className="w-100 d-lg-none">
            <Form onSubmit={handleSubmit} className="w-100">
              <Input
                type="text"
                placeholder="Buscar en AntiSocial"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="mb-0"
                classNameControl="w-100 ps-3 rounded-pill bg-black border-dark text-white"
              />
            </Form>
          </div>
        </div>
      </header>

      {showAsideContent && (
        <div className="d-flex d-lg-none flex-column gap-3 mb-4">
          <Trends />
          <RecommendedUsers />
        </div>
      )}

      <Row className="g-4">
        <Col xs={12}>
          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : busqueda.length > 0 ? (
            <div className="posts-container">
              {busqueda.map((post) => (
                <PostPreview
                  key={post._id}
                  user={post.user}
                  images={post.image}
                  description={post.description}
                  date={post.upload_date}
                  postId={post._id}
                  tags={post.tag}
                  actions={<PostActions post={post} />}
                />
              ))}
            </div>
          ) : (
            showAsideContent ? null : (
              <div className="text-center py-5">
                <p className="text-secondary fs-5">
                  {query || tagId
                    ? `No encontramos publicaciones para "${query || `#${tag?.name || ''}`}"`
                    : "Usa el buscador para encontrar publicaciones o explora los tags más populares."
                  }
                </p>
              </div>
            )
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Search;