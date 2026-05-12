import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Spinner } from 'react-bootstrap';
import { useAuth } from "@/app/providers";
import { getUserById } from "@/entities/user";
import { SectionNav, TabScene } from "@/widget/layout";
import { UserInformation } from "@/entities/user"; // Importación limpia de entidad
import { Button } from "@/widget/ui"; // Tu componente compartido
import { UserPosts, UserComments } from "@/features/Profile/ui";

export const ProfileView = () => {
    const { id: urlId } = useParams();
    const navigate = useNavigate();
    const { usuario } = useAuth();
    
    const [user, setUser] = useState(null);

    // Determinamos si el perfil visualizado es el del usuario logueado
    const isOwnProfile = !urlId || urlId === "user" || urlId === usuario?._id;

    useEffect(() => {
        const loadUser = async () => {
            try {
                if (!urlId || urlId === "user") {
                    setUser(usuario);
                    return;
                }
                const data = await getUserById(urlId);
                setUser(data);
            } catch (error) {
                console.error("Error al cargar el usuario:", error);
            }
        };
        loadUser();
    }, [urlId, usuario]);

    if (!user) {
        return (
            <Container className="text-center p-5">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    const profileTabs = [
        {
            label: "Publicaciones",
            content: <UserPosts user={user} />
        },
        {
            label: "Comentarios",
            content: <UserComments user={user} />
        }
    ];

    return (
        <>

            <SectionNav title={user.nickname} />
            <Container fluid className="p-3 pt-0">
                
                <UserInformation
                    user={user}
                    postsCount={user.postCount || 0}
                    commentsCount={user.commentCount || 0}
                    // Inyectamos la acción solo si es su propio perfil
                    actions={
                        isOwnProfile && (
                            <Button 
                                variant="secondary" 
                                className="rounded-pill px-4 fw-bold"
                                onClick={() => navigate('/user/edit')}
                            >
                                Editar perfil
                            </Button>
                        )
                    }
                />
            </Container>
            
            <div className="mt-2">
                <TabScene tabs={profileTabs} />
            </div>
        </>
    );
};