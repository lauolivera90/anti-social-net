export const TagBadge = ({ name, className = "" }) => {
  if (!name) return null;
  
  return (
    <span className={`text-primary text-capitalize small ${className}`}>
      #{name}
    </span>
  );
};