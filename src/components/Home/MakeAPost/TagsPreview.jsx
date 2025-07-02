import React, { useEffect, useRef, useState } from 'react';

const TagsPreviews = ({selectedTags, setSelectedTags}) => {
    const [showAddTag, setShowAddTag] = useState(false);
    const [tags, setTags] = useState([]);
    const popupRef = useRef(null);

    const getTags = async () => {
        try{
            const response = await fetch("http://localhost:3000/tag");
        if (!response.ok) {
            throw new Error("Error al obtener las etiquetas");
        }
        const data = await response.json();
        setTags(data);
        }
        catch (error) {
            console.error({ error: error.message });
        }
    }

    const setChecked = (tagName) =>{
        if (selectedTags.includes(tagName)) {
            return true
        }
        return false;
    }

    useEffect(() => {
        //obtengo los tags antes de cargar el componente
        getTags();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            //Verifica si el clic fue fuera del popup
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowAddTag(false);
        }};
        if (showAddTag) {
            //Agrega el evento de clic al documento cuando el componente es visible 
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('scroll', handleClickOutside);
        }
        return () => {
            //Elimina el evento cuando el componente se cierra
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('scroll', handleClickOutside);
        };
    }, [showAddTag]);

    return (
        <>
          <i className="bi bi-tag-fill fs-5" onClick={() => {
                    setShowAddTag(!showAddTag)
                }}></i>
                {showAddTag && (
                    <div ref={popupRef} className="position-absolute z-2 mt-2 d-flex flex-row gap-4 bg-white pt-3 pb-3 p-2 border rounded-3" style={{ top: "100%", left: 0 }}>
                         {tags.map((tag) => (
                            <div className='d-flex flex-row gap-2' key={tag._id}>
                                <a className='text-primary text-capitalize'>#{tag.name}</a>
                                <input type="checkbox" className='form-check-input' checked={setChecked(tag._id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedTags((prev) => [...prev, tag._id]);
                                        const p = document.createElement('p');
                                        const tagsContainer = document.querySelector('#tags');
                                        p.textContent = `#${tag.name}`;
                                        p.className = 'text-primary text-capitalize';
                                        tagsContainer.appendChild(p);
                                    } else {
                                        setSelectedTags((prev) => prev.filter((t) => t !== tag._id));
                                        const tagsContainer = document.querySelector('#tags');
                                        const tagElements = tagsContainer.querySelectorAll('p');
                                        tagElements.forEach((element) => {
                                            if (element.textContent === `#${tag.name}`) {
                                                element.remove();
                                            }
                                        });
                                    }
                                }}
                                ></input> 
                            </div>
                        ))}
                    </div>
                )}
        </> )
    }

export default TagsPreviews;