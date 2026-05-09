import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
// Importamos lo que ya refactorizamos
import { formatTime } from "@/shared/hook";
import { ImageGrid, PostSkeleton } from "@/shared/ui";
import { TagBadge } from "@/entities/tag/ui/TagBadge";
import {Avatar} from "@/widget/ui";

export const PostPreview = ({ user = {}, description, images, date, postId, tags = [] }) => {
  const navigate = useNavigate();

  const goToPost = (e) => {
    e.stopPropagation();
    navigate(`/post/${postId}`);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    if (user?._id) navigate(`/user/${user._id}`);
  };

  return (
    <PostSkeleton
      user={user}
      onClick={goToPost}
      onProfileClick={handleProfileClick}
      headerExtra={`· ${formatTime(date)}`}
    >
      <p className="text-start mb-2">{description}</p>
      
      <div className="d-flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <TagBadge key={tag._id} name={tag.name} />
        ))}
      </div>

      <ImageGrid images={images} />
    </PostSkeleton>
  );
};