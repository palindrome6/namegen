import axios from 'axios';
import { ValidationHelper } from '../common/ValidationHelper';
import { NameListAPIURL } from '../common/Constants';

let nameList = [];
export const getNameList = async (value) => {
    NameListAPIURL.searchParams.set('name', value);
    const url = NameListAPIURL.toString();
    console.log(url);
    axios({
        method: 'get',
        url: url,
        data: {
            name: value,
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    }).then((response) => {
        if (ValidationHelper.isNotUndefinedOrNull(response?.data) && ValidationHelper.isNotEmptyString(response?.data)) {
            nameList = response.data.split(',');
        }
    }).catch((err) => {
        console.error(`Could not process request - ${err}`)
    })
    return nameList;
};