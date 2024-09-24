
function formatDate(date) {
    let dateObj = new Date(date);
    let year = dateObj.getFullYear();
    let month = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Months are zero-indexed
    let day = ('0' + dateObj.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

function formatDateTime(date) {
    let dateObj = new Date(date);
    let year = dateObj.getFullYear();
    let month = ('0' + (dateObj.getMonth() + 1)).slice(-2); // Months are zero-indexed
    let day = ('0' + dateObj.getDate()).slice(-2);
    let hours = ('0' + dateObj.getHours()).slice(-2);
    let minutes = ('0' + dateObj.getMinutes()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export { formatDate, formatDateTime };

