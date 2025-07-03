import React, {useEffect, useRef, useState } from 'react';
import Emoji from './Emoji';
import ImagesPreview from './ImagesPreview';
import TagsPreview from './TagsPreview';


const MakeAPost = () => {
    const [inputText, setInputText] = useState("");
    const [images, setImages] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const textareaRef = useRef(null);

    const post = async() => {
        try {
            const response = await fetch("http://localhost:3000/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: "686550ae29fae48f2be39994",
                    description: inputText,
                    image: images,
                    tag: selectedTags,
                }),
            });
            if (!response.ok) {
                throw new Error("Error al publicar el post", response.statusText);
            }
            const data = await response.json();
            console.log(data);
            // Reset state after posting
            setInputText("");
            setImages([]);
            setSelectedTags([]);
            document.querySelector('#contain-images').innerHTML = '';
            document.querySelector('#tags').innerHTML = '';
        } catch (error) {
            console.error({ error: error.message });
        }
    }

    const handleChange = (e) => {
            const el = textareaRef.current;
            el.style.height = 'auto'; // Reinicia el alto
            if (el.scrollHeight > 200) {
                el.style.overflowY = 'scroll'; // Agrega scroll si el contenido es muy grande
                el.style.height = '200px'; // Limita la altura máxima
                setInputText(e.target.value);
                return;
            }
            el.style.height = el.scrollHeight + 'px'; // Ajusta al contenido
            setInputText(e.target.value);
        };

    useEffect(() => {
        const counter = document.querySelector('#counter');
            document.querySelector('#post').disabled = false;
            if (inputText.length > 0) {
                // Actualiza el contador de caracteres
                counter.textContent = `${inputText.length}`;
                document.querySelector('#post').disabled = false;    
                if (inputText.length > 2200) {
                    // Si el texto supera los 2200 caracteres, cambia el color del contador a rojo 
                    // y deshabilita el botón de publicar
                    counter.style.color = 'red';
                    counter.textContent = `-${inputText.length}`;
                   document.querySelector('#post').disabled = true;
                   return;
                }
                counter.style.color = 'white';
            }
            // Si no hay texto, limpia el contador
            else {
                counter.textContent = '';
                document.querySelector('#post').disabled = true;    
            }
    }, [inputText]);

    useEffect(() => {
        document.querySelector('#post').disabled = true;
    }, [])

    return (
        <div className="bg-black border-bottom border-dark text-white d-flex flex-column p-4">
            <div className="d-flex flex-row gap-3 ps-3 pe-3 position-relative">
                <ImagesPreview images={images} setImages={setImages}/>
                <Emoji setInputText={setInputText}></Emoji>
                <TagsPreview setSelectedTags={setSelectedTags} selectedTags={selectedTags}/>
                <div className="d-flex justify-content-end flex-grow-1">
                    <span id='counter' className='me-2'></span>
                    <button className="justify-content-end btn btn-primary" id="post" onClick={post} disabled={true} >Publicar</button>
                </div>
            </div>
            <div className='d-flex flex-column gap-2 border-top pt-3 mt-3'>
                <textarea ref={textareaRef} className="form-control mb-3 bg-black ps-2 pe-2 border-0 text-white" style={{height:"auto"}} value={inputText}
                onChange={handleChange} placeholder="¿En qué estás pensando?" rows={1}/>
                <div className='d-flex flex-row gap-2' id='tags'></div>
                <div id='contain-images'
                style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                </div>
            </div>
    
        </div>
    );
}


export default MakeAPost;