const TimeAgo = ({ date }) => {

    function formatTime() {
  const ahora = new Date();
  const postDate = new Date(date);
  const diferenciaMilisegundos = ahora - postDate;
  const diferenciasSegundos = Math.floor(diferenciaMilisegundos / 1000);
  const diferenciaMinutos = Math.floor(diferenciasSegundos / 60);
  const DiferenciaHoras = Math.floor(diferenciaMinutos / 60);
  const DiferenciasDias = Math.floor(DiferenciaHoras / 24);
  const DiferenciaAños = ahora.getFullYear() - postDate.getFullYear();

  if (diferenciasSegundos < 60) return `${diferenciasSegundos}s`;
  if (diferenciaMinutos < 60) return `${diferenciaMinutos}m`;
  if (DiferenciaHoras < 24) return `${DiferenciaHoras}h`;
  if (DiferenciasDias < 7) return `${DiferenciasDias}d`;

  const opcionesCortas = { day: "2-digit", month: "short" };
  const opcionesLargas = { day: "2-digit", month: "short", year: "numeric" };

  return DiferenciaAños >= 1
    ? postDate.toLocaleDateString("en-US", opcionesLargas)
    : postDate.toLocaleDateString("en-US", opcionesCortas);
}

    return (
        <>
        <span className="text-secondary"> · {formatTime()}</span>
        </>
    );
};

export default TimeAgo;