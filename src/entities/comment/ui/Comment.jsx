import { useNavigate } from "react-router-dom";
import { PostSkeleton } from "@/shared/ui"; // El layout compartido
import { formatTime } from "@/shared/hook"; // Si decides agregar la fecha luego

export const Comment = ({ user, text, date }) => {
  const navigate = useNavigate();

  const handleProfileClick = (e) => {
    e.stopPropagation();
    if (user?._id) {
      if (window.location.pathname !== `/user/${user._id}`) {
        navigate(`/user/${user._id}`);
      }
    }
  };

  return (
    <>
      <PostSkeleton
        user={user}
        onProfileClick={handleProfileClick}
        headerExtra={date ? `· ${formatTime(date)}` : null}
        >
        <p className="text-start m-0 text-white">
          {text}
        </p>
      </PostSkeleton>
    </>
  );
};