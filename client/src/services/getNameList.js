export const getNameList = () => {
    const URL = `https://jsonplaceholder.typicode.com/todos`;
    return fetch(URL);
};


export const sendRequest = async (value) => {
    const URL = `http://127.0.0.1:5000/generatename?name=${value}`;
    return fetch(URL, {
        method: 'get',
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    });
};