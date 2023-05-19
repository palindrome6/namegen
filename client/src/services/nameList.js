import axios from 'axios';
import { NameListAPIURL } from '../common/Constants';

export const getNameList = async (value) => {
    NameListAPIURL.searchParams.set('name', value);
    const url = NameListAPIURL.toString();
    const response = axios({
        method: 'get',
        url: url,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/html"
        }
    }).catch((err) => {
        console.error(`Could not process request - ${err}`);
        return `hello, world, ${err}`;
    })
    return response;
};