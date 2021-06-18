export const isLoggenIn = () => {
    return !!localStorage.getItem('events-token')
}

export const getToken = () => {
    return localStorage.getItem('events-token');
}