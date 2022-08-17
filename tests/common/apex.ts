import axios, {
    AxiosResponse,
    AxiosStatic
} from 'axios';

// import {
//     yesterday,
//     yesterdayDB
// } from "./utils";

// import fs from 'fs';
// import FormData from 'form-data';

// // https://gb9fb258fe17506-apexdb.adb.ap-seoul-1.oraclecloudapps.com/ords/twright/v1/twright/logs/:rid

// const auth_key = '766614B7C9A901198F2F5630349ADB7A9DAFB63976AF64DBB8A775D3BCCBDDB1'
// const DEV = 'https://g575dfbc1dbf538-playwright.adb.ap-seoul-1.oraclecloudapps.com/ords/playwright/'
// const post_url = DEV + 'v1/twright/logs/'
// const get_url  = DEV + 'v1/twright/tests/'
// const get_all_url = DEV + 'twright/v1/twright/tests' 


// const image_url = 'images/images/';
// const json_url = 'jons//jsons/'


const p_url = 'https://g575dfbc1dbf538-playwright.adb.ap-seoul-1.oraclecloudapps.com/ords/playwright/jons//jsons/'

const auth_key = '766614B7C9A901198F2F5630349ADB7A9DAFB63976AF64DBB8A775D3BCCBDDB1'
const DEV = 'https://gb9fb258fe17506-apexdb.adb.ap-seoul-1.oraclecloudapps.com/ords/twright/'
const post_url = DEV + 'v1/twright/logs/'
const get_url  = DEV + 'v1/twright/tests/'
const get_all_url = DEV + 'twright/v1/twright/tests' 

async function getUrlList(): Promise < any[] > {
    let users: any[] = [];
    const response:any =  await axios.get('https://g575dfbc1dbf538-playwright.adb.ap-seoul-1.oraclecloudapps.com/ords/playwright/lists/lists/', {
        // headers: {
        //     Authorization: auth_key 
        // }
    })
    console.log(response.data)
    return response.data.items
}

async function getProjectUrlList(): Promise < any[] > {
    let users: any[] = [];
    const response:any =  await axios.get('https://g575dfbc1dbf538-playwright.adb.ap-seoul-1.oraclecloudapps.com/ords/playwright/lists/projects/', {
        // headers: {
        //     Authorization: auth_key 
        // }
    })
    console.log(response.data)
    return response.data.items
}

async function postApex(upJson: any):Promise < boolean > {
    const request_config = {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": auth_key,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        data: upJson
    };
    const response = await axios.post(p_url,  upJson, request_config);
    console.log(p_url, upJson)
    try {
        if (response.status === 200) { // response - object, eg { status: 200, message: 'OK' }
            console.log(response.data);
            return true;
        }
        return false;
    } catch (err) {
        console.error(err)
        return false;
    }
}

async function getUid(uid: string): Promise < any[] > {
    let users: any[] = [];
    // userinfo_url = get_url + payment
    console.log(get_url + uid)
    const response:any =  await axios.get(get_url + uid, {
        // headers: {
        //     Authorization: auth_key 
        // }
    })
    // console.log(response.data)
    return response.data
}

async function getUidAll(): Promise < any[] > {
    let users: any[] = [];

    // console.log(get_all_url)
    const response:any =  await axios.get('https://gb9fb258fe17506-apexdb.adb.ap-seoul-1.oraclecloudapps.com/ords/twright/v1/twright/tests', {
        // headers: {
        //     Authorization: auth_key 
        // }
    })
    console.log(response.data)
    return response.data.items
}

export {
    postApex,
    getUrlList,
    getProjectUrlList,
    getUidAll
}
