import { useEffect, useState } from "react";


const EditProfile = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    mail: "",
    password: ""
  });

  const [loading, setLoading] = useState(true);


  const fetchUser = async () => {
      try {
        const userId = window.location.pathname.split('/')[2];
        const res = await fetch(`http://localhost:3000/user/${userId}`);
        const data = await res.json();
        setFormData({
          nickname: data.nickname || "",
          mail: data.mail || "",
          password: data.password || ""
        });
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar el perfil", error);
      }
    };

  useEffect(() => {
    // Obtener los datos del usuario
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const userId = window.location.pathname.split('/')[2];
      const res = await fetch(`http://localhost:3000/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nickname: formData.nickname,
          mail: formData.mail,
          password: formData.password
        })
      });

      if (!res.ok) throw new Error("Error al actualizar");

      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("Hubo un problema al actualizar");
    }
  };

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <div>
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nickname:</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.mail}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditProfile;
