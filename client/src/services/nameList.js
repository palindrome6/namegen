// import axios from 'axios';
import { NameListAPIURL } from '../common/Constants';

export const getNameList = async (value) => {
    NameListAPIURL.searchParams.set('name', value);
    const url = NameListAPIURL.toString();
    const res = await fetch(url, {
        method: 'get',
        headers: new Headers({
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Request-Method': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS',
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
        }),
    })
    return res.text();
};