const Comment = ({ user, text, date }) => {
    return (
        <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-semibold text-gray-800">@{user}</h4>
                <span className="text-xs text-gray-500">{new Date(date).toLocaleString()}</span>
            </div>
            <p className="text-gray-700 text-sm">{text}</p>
        </div>
    );
}

export default Comment