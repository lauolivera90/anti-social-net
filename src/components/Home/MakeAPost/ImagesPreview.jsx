import React, {useEffect, useRef, useState } from 'react';

const ImagesPreview = ({images, setImages}) => {
    const [showAddImage, setShowAddImage] = useState(false);
    const popupRef = useRef(null);

     const addImage = (url) => {
        //hacer que si una url esta no se agregue
        if (!/^https?:\/\/.+(\.(jpg|jpeg|png|gif)(\?.*)?$|[?&]format=(jpg|jpeg|png|gif))/.test(url)) return alert("Debes ingresar una URL válida de imagen");
        const containImages = document.getElementById('contain-images');
        const newImage = document.createElement('img');
        const container = document.createElement('div');
        container.className = 'position-relative';
        newImage.src = url;
        newImage.className = 'img-thumbnail';

        const newLabel = document.createElement('i');
        newLabel.className = 'bi bi-x-square-fill btn fs-3 text-white  position-absolute top-0 end-0';
        container.appendChild(newImage);
        container.appendChild(newLabel);

        newLabel.onclick = () => {
            container.remove(); //elimina el contenedor de la imagen
            setImages((prev) => prev.filter((image) => image.url !== url)); //elimina la imagen del estado
        }

        containImages.appendChild(container);
        setImages((prev) => [...prev, { url }]); //copia las imagenes anteriores y agrega la nueva
        document.querySelector('#input-image').value = '';
        setShowAddImage(false);
        console.log(images)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Verifica si el clic fue fuera del popup

            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowAddImage(false);
            }
        };
        if (showAddImage) {
            // Agrega el evento de clic al documento cuando el componente es visible 
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('scroll', handleClickOutside);

        }
        return () => {
            // Elimina el evento cuando el componente se cierra
            document.removeEventListener('mousedown', setShowAddImage);
            document.removeEventListener('scroll', handleClickOutside);
        };
    }, [showAddImage]);

    return (
        <>
        <i className="bi bi-card-image fs-5" onClick={() => {
                    if (images.length < 4) {
                        setShowAddImage(!showAddImage)
                    }
                }}></i>
                {showAddImage && (
                    <div ref={popupRef} className="position-absolute z-2 mt-2 d-flex flex-column gap-4 bg-white pt-3 pb-3 p-2 border rounded-3" style={{ top: "100%", left: 0 }}>
                        <div className='d-flex flex-row gap-2'>
                            <input className='border rounded-3 bg-white text-black' type="url" placeholder='Url de la imagen' id='input-image'/>
                            <i className='bi bi-trash3-fill btn fs-5 text-black' onClick={() => {
                                document.querySelector('#input-image').value = '';
                
                            }}></i>
                        </div>
                        <button className="btn btn-primary" onClick={() => addImage(document.querySelector('#input-image').value)}>Añadir</button>
                    </div>
                )}
    </>
    )
}

export default ImagesPreview;