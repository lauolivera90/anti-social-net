import { useState } from "react";
import { useAuth } from "@/app/providers";
import { ActionButton } from "@/widget/ui";
import { EditCommentModal } from "./EditCommentModal";
import { useDeleteComment } from "../hook/useDeleteComment";

export const CommentActions = ({ comment }) => {
  const { usuario } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const { handleDeleteComment, isDeleting } = useDeleteComment();

  // Determina si el usuario logueado es el dueño del comentario
  const isOwner = usuario?._id === (comment?.user?._id || comment?.user);

  const options = [
    {
      label: "Compartir",
      icon: "bi bi-share",
      onClick: () => {
        navigator.clipboard.writeText(`${window.location.origin}/post/${comment?.post}`);
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
          const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este comentario?");
          if (confirmDelete) {
            handleDeleteComment(comment._id, () => window.location.reload());
          }
        },
        isDanger: true,
      }
    );
  }

  return (
    <>
      <ActionButton options={options} />
      {isOwner && (
        <EditCommentModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          comment={comment}
          onCommentUpdated={() => window.location.reload()}
        />
      )}
    </>
  );
};