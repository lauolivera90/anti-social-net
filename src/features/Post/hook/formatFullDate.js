/**
 * Formatea una fecha al estilo: "12:31 AM · May 8, 2026"
 */
export const formatFullDate = (date) => {
  if (!date) return "";
  const dateUpload = new Date(date);

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(dateUpload);
  
  const dateFormatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(dateUpload);

  return `${time} · ${dateFormatted}`;
};