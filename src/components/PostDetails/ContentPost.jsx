import Images from './Images';
import UploadDate from  './uploadDate';
import PostNav from './PostNav';
import Tags from './Tags';
import { useNavigate } from "react-router-dom";

const ContentPost = ({description, user, date, image, tag}) => {
    const navigate = useNavigate();

    const goToProfile = (e) => {
        e.stopPropagation();
        if (user && user._id) {
            navigate(`/user/${user._id}`);
        } else {
            console.log("User no válido");
        }
    };

    return (
        <div className="border-0 border-bottom border-dark p-4 shadow-sm hover:shadow-md transition bg-black text-white">
            <PostNav />
            <div className='d-flex flex-row gap-2'>
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user icon" onClick={goToProfile}
                className="img-circle " style={{ width: "48px", height: "48px", objectFit: "cover" }}/>
                <div className='d-flex flex-column'>
                    <p className='text-capitalize fw-bold m-0' onClick={goToProfile}>{user.nickname}</p>
                    <p className='text-secondary' onClick={goToProfile}>@{user.nickname}</p>
                </div>
            </div>
            <div className='d-flex flex-column m-0'>
                <p className='text-start mt-0 m-0'>{description}</p>
                <Tags tags={tag || []} />
            </div>
            <Images images={image}/>
            <UploadDate date={date} />
        </div>
    );
};

export default ContentPost;