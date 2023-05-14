import axios from 'axios';
import { ValidationHelper } from '../common/ValidationHelper';

let nameList = [];
export const setNameList = async (value) => {
    const URL = `http://127.0.0.1:5000/generatename?name=${value}`;
    axios({
        method: 'get',
        url: URL,
        data: {
            name: value,
        },
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }).then((response) => {
        if (ValidationHelper.isNotUndefinedOrNull(response) && ValidationHelper.isNotEmptyString(response)) {
            nameList = response.split(',');
        }
    }).catch((err) => {
        console.error(`Could not process request - ${err}`)
    })
    return
};

export const getNameList = () => {
    return nameList;
}