const Tags = ({ tags }) => {
    return (
        <>
            {tags && tags.length > 0 && (
                        <div className="d-flex flex-row gap-2">
                            {tags.map((tag, index) => (
                                <p key={index} className="text-primary text-capitalize m-0">#{tag.name}</p>
                            ))}
                        </div>
                    )}
        </>
    )
}

export default Tags;