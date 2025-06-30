import Images from './Images';
import UploadDate from  './uploadDate';
import PostNav from './postNav';

const ContentPost = ({description, user, date, image}) => {
    return (
        <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-black text-white">
            <PostNav />
            <div className='d-flex flex-row gap-2'>
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user icon" 
                className="img-circle " style={{ width: "48px", height: "48px", objectFit: "cover" }}/>
                <div className='d-flex flex-column'>
                    <p className='text-capitalize fw-bold'>{user}</p>
                    <p className='text-secondary'>@{user}</p>
                </div>
            </div>
            <p className='text-start'>{description}</p>
            <Images images={image}/>
            <UploadDate date={date} />
        </div>
    );
};

export default ContentPost;