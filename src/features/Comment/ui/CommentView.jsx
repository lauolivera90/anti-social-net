import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Comment, getCommentById } from "@/entities/comment";
import { CommentActions } from "@/features/Comment-Management/ui";
import { SectionNav } from "@/widget/layout";

export function CommentView({ commentId }) {
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComment = async () => {
            if (!commentId) return;
            setLoading(true);
            try {
                const data = await getCommentById(commentId);
                setComment(data);
            } catch (error) {
                console.error("Error al cargar el comentario:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComment();
    }, [commentId]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center p-3 border-bottom border-dark">
                <Spinner animation="border" variant="secondary" size="sm" />
            </div>
        );
    }

    if (!comment) return null;

    return (
        <div className="vh-100">
            <SectionNav title="Comentario"/>
            <Comment 
                user={comment.user}
                text={comment.description || comment.text}
                date={comment.upload_date}
                actions={<CommentActions comment={comment} />}
            />
        </div>
    );
}