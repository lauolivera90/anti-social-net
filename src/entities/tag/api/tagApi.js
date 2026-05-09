const BASE_URL = "https://antisocialnet-backend.onrender.com/tag";

export const fetchTags = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Error al obtener las etiquetas");
  return await response.json();
};