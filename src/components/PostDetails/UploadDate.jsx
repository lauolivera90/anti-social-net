const UploadDate = ({date}) => {

    const formatDate = () => {
        const dateUpload = new Date(date);

        const time = new Intl.DateTimeFormat("es-AR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }).format(dateUpload);

        const dateFormatted = new Intl.DateTimeFormat("es-AR", {
            month: "short",
            day: "2-digit", 
            year: "numeric", 
        }).format(dateUpload);

        return `${time} · ${dateFormatted}`;
    };

    return (
        <>
            <p className="text-secondary text-start mt-3">{formatDate()}</p>
        </>
    );
};

export default UploadDate;