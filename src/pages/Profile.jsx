import {useEffect, useState} from "react";
import UserInformation from "../components/UserProfile/UserInformation";
import UserPosts from "../components/UserProfile/userPosts";
import UserComments from "../components/UserProfile/UserComments";
import PostNav from "../components/PostDetails/PostNav";

const Profile = () => {
    
    const [user, setUser] = useState({});
    const [postLenght, setPostLength] = useState(0);

    const loadUser = async () => {
        try {
            let userId = window.location.pathname.split('/').pop();
            const response = await fetch(`http://localhost:3000/user/${userId}`);
            if (!response.ok) {
                throw new Error("Error de red al cargar el usuario");
            }
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Error al cargar el usuario:", error);
        }
    }

    function handleShowPosts() {
        const postsSection = document.querySelector('#user-posts');
        const postsButton = document.querySelector('#user-postsButton');
        const commentsButton = document.querySelector('#user-commentsButton');
        const commentsSection = document.querySelector('#user-comments');
        //Mostrar los posts y ocultar los comentarios
        postsSection.style.display = 'block';
        commentsSection.style.display = 'none';
        //Cambiar el estilo de los botones
        postsButton.classList.add('text-white','border-0', 'border-bottom', 'border-5', 'rounded-1');
        commentsButton.classList.remove('text-white','border-0', 'border-bottom', 'border-5', 'rounded-1');
        commentsButton.classList.add('text-secondary');

    }

    function handleShowComments() {
        const postsSection = document.querySelector('#user-posts');
        const postsButton = document.querySelector('#user-postsButton');
        const commentsButton = document.querySelector('#user-commentsButton');
        const commentsSection = document.querySelector('#user-comments');
        //Mostrar los comentarios y ocultar los posts
        postsSection.style.display = 'none';
        commentsSection.style.display = 'block';
        //Cambiar el estilo de los botones
        commentsButton.classList.add('text-white','border-0', 'border-bottom', 'border-5', 'rounded-1');
        postsButton.classList.remove('text-white', 'border-0', 'border-bottom', 'border-5', 'rounded-1');
        postsButton.classList.add('text-secondary');
    }



    useEffect(() => {
        loadUser();
    }, []);

    return (
        <div className="p-4 bg-black">
            <PostNav />
            <div className="bg-black d-flex flex-column">
                <UserInformation nickname={user.nickname}
                    postsCount={postLenght}
                    commentsCount={5}
                />
                <div className="justify-content-evenly  border border-dark border-0 border-bottom d-flex flex-row mt-5">
                    <p id="user-postsButton" className="text-white text-center pb-2 border-0 border-bottom border-5 rounded-1" 
                    onClick={handleShowPosts}>Publicaciones</p>
                    <p id="user-commentsButton" className="text-center pb-2"
                    onClick={handleShowComments}>Comentarios</p>
                </div>
                <div className="">
                    <div>
                        <div id="user-posts"><UserPosts setPostLength={setPostLength}/></div>
                        <div id="user-comments" style={{display:"none"}}><UserComments/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;