import axios from 'axios';
import { ValidationHelper } from '../common/ValidationHelper';
import { NameListAPIURL } from '../common/Constants';

let nameList = [];
export const getNameList = async (value) => {
    NameListAPIURL.searchParams.set('name', value);
    const url = NameListAPIURL.toString();
    // const response = axios({
    //     method: 'get',
    //     url: url,
    //     data: {
    //         name: value,
    //     },
    //     headers: {
    //         "Access-Control-Allow-Origin": "*",
    //     }
    // }).catch((err) => {
    //     console.error(`Could not process request - ${err}`)
    // })
    
    const response1 =  fetch(url, 
        {
            method: 'GET',
            headers: {
                        "Access-Control-Allow-Origin": "*"},
            
            

        })
        // console.log(response, response1.text());
    return response1;
};