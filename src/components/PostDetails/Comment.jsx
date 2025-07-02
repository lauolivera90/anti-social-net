import TimeAgo from "../Home/TimeAgo";

const Comment = ({ user, text, date }) => {
    return (
        <div className="d-flex flex-row border-0 border-bottom border-dark bg-black pe-4 ps-4 pt-3 pb-1 gap-2 text-white">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user icon" 
            className="img-circle" style={{ width: "48px", height: "48px", objectFit: "cover" }}/>
            <div className="d-flex flex-column">
                <div className="d-flex flex-row gap-2">
                    <p className="text-capitalize fw-bold m-0">{user}</p>
                    <p className="text-secondary m-0">@{user}</p>
                    <TimeAgo date={date} />
                </div>
                <p className="text-start">{text}</p>
            </div>
        </div>
    );
};

export default Comment;