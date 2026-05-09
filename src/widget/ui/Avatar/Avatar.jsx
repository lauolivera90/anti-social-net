import { Image } from "react-bootstrap";

export const Avatar = ({ src, alt, size = "48px", onClick, className = "" }) => {
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  
  return (
    <Image
      src={src || defaultImage}
      alt={alt || "User avatar"}
      onClick={onClick}
      roundedCircle
      className={`${className} ${onClick ? 'cursor-pointer' : ''}`}
      style={{ 
        width: size, 
        height: size, 
        objectFit: "cover",
        cursor: onClick ? 'pointer' : 'default' 
      }}
    />
  );
};