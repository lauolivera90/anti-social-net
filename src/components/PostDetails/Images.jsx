const PostImages = ({ images }) => {
  const total = images.length;

  if (total === 0) return null;

  return (
    <div className="m-0 p-0 mt-3 w-75" style={{ overflowX: 'hidden' }}>
      <div className="row g-1">
        {total === 1 && (
          <div className="col-12">
            <img src={images[0].url} alt="Imagen 1" className="img-fluid rounded" />
          </div>
        )}

        {total === 2 &&
          images.map((img, i) => (
            <div key={i} className="col-6">
              <img src={img.url} alt={`Imagen ${i + 1}`} className="img-fluid rounded h-100 w-100" />
            </div>
          ))}

        {total === 3 && (
          <>
            <div className="col-12">
              <img src={images[0].url} alt="Imagen 1" className="img-fluid rounded mb-1" />
            </div>
            <div className="col-6">
              <img src={images[1].url} alt="Imagen 2" className="img-fluid rounded h-100 w-100" />
            </div>
            <div className="col-6">
              <img src={images[2].url} alt="Imagen 3" className="img-fluid rounded h-100 w-100" />
            </div>
          </>
        )}

        {total === 4 &&
          images.map((img, i) => (
            <div key={i} className="col-6">
              <img src={img.url} alt={`Imagen ${i + 1}`} className="img-fluid rounded h-100 w-100" style={{ maxWidth: "100%", height: "auto", objectFit: "cover" }} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostImages;