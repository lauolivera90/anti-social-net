import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/app/providers";
import { ActionButton } from "@/widget/ui";
import { EditPostModal } from "./EditPostModal";
import { useDeletePost } from "../hook/useDeletePost";

export const PostActions = ({ post }) => {
  const { usuario } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const { handleDeletePost, isDeleting } = useDeletePost();
  const navigate = useNavigate();
  const location = useLocation();


  // Determina si el usuario logueado es el dueño del post
  // Soporta que post.user sea un objeto poblado o simplemente un string ID
  const isOwner = usuario?._id === (post?.user?._id);

  // Construye el array de opciones condicionalmente
  const options = [
    {
      label: "Compartir",
      icon: "bi bi-share",
      onClick: () => {
        // La funcionalidad se implementará más adelante
        navigator.clipboard.writeText(`${window.location.origin}/post/${post._id}`);
        alert("¡Enlace copiado al portapapeles!");
      },
    },
  ];

  if (isOwner) {
    options.push(
      { divider: true },
      {
        label: "Modificar",
        icon: "bi bi-pencil",
        onClick: () => setShowEditModal(true),
      },
      {
        label: isDeleting ? "Eliminando..." : "Eliminar",
        icon: "bi bi-trash",
        onClick: () => {
          const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta publicación?");
          if (confirmDelete) {
            handleDeletePost(post._id, () => {
              // Si estamos en la vista de detalle de este post específico, volvemos a home.
              if (location.pathname === `/post/${post._id}`) {
                navigate("/home");
              } else {
                window.location.reload(); // De lo contrario, solo recargamos la vista actual (ej. feed, perfil).
              }
            });
          }
        },
        isDanger: true, // Aplica el estilo rojo de peligro
      }
    );
  }

  return (
    <>
      <ActionButton options={options} />
      {isOwner && (
        <EditPostModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          post={post}
          onPostUpdated={() => {
            // Recargamos la vista actual para reflejar los cambios del post modificado
            window.location.reload();
          }}
        />
      )}
    </>
  );
};
