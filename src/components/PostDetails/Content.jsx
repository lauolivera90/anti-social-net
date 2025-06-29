const Comment = ({description, user, tags}) => {
    return (
        <>
            <h4>@{user}</h4>
            <p>@{description}</p>
            <div className="img-thumbnail">foto</div>
            <span>@{tags}</span>
        </>
    );
}

export default Comment