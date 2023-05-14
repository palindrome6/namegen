export const getNameList = () => {
    const URL = `https://jsonplaceholder.typicode.com/todos`;
    return fetch(URL);
};


export const sendRequest = () => {
    const URL = `https://localhost:5000/`;
    return fetch(URL);
};