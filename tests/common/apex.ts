import axios, {
    AxiosResponse,
    AxiosStatic
} from 'axios';

import {
    yesterday,
    yesterdayDB
} from "./utils";

import fs from 'fs';
import FormData from 'form-data';

// https://gb9fb258fe17506-apexdb.adb.ap-seoul-1.oraclecloudapps.com/ords/twright/v1/twright/logs/:rid

const auth_key = '766614B7C9A901198F2F5630349ADB7A9DAFB63976AF64DBB8A775D3BCCBDDB1'
const DEV = 'https://g575dfbc1dbf538-playwright.adb.ap-seoul-1.oraclecloudapps.com/ords/playwright/'
const post_url = DEV + 'v1/twright/logs/'
const get_url  = DEV + 'v1/twright/tests/'
const get_all_url = DEV + 'twright/v1/twright/tests' 

/**
 * Test UID 정보
 * @param {string} uid uid
 * @returns {user[]} id, pwd array
 */
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

    console.log(get_all_url)
    const response:any =  await axios.get('https://gb9fb258fe17506-apexdb.adb.ap-seoul-1.oraclecloudapps.com/ords/twright/v1/twright/tests', {
        // headers: {
        //     Authorization: auth_key 
        // }
    })
    console.log(response.data)
    return response.data.items
}

async function postApex(rid : String, upJson: any):Promise < boolean > {
    const request_config = {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": auth_key,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        data: upJson
    };
    const response = await axios.post(post_url + rid, upJson, request_config);
    console.log(post_url, upJson)
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



async function upload_video(url: String, fileType: String, fileName: String, fil                                                                                                                                   eLocation) {
    const fs = require('fs')
    const form_data = new FormData();
    try {
      fs.readdir('./videos', function (err, files) { //Get a listing of all the fi                                                                                                                                   les in the dir
          // if (err) throw err;
          try {
          files.forEach(function (file) {
              console.log(page_id, file);
              form_data.append('file', fs.createReadStream('videos/' + file));
              const request_config = {
                headers: {
                  "filename": file,
                  "image_type": 'image/webp',
                  "page_id": page_id,
                  "serial_id": serial_id,
                  "Content-Type": "multipart/form-data"
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
                data: form_data
              };
              return axios
                .post(url, form_data, request_config);
  
          });
        } catch (e) {}
      })
    } catch (e) {}
  
  }
  async function upload_image(url: String, fileType: String, fileName: String, fil                                                                                                                                   eLocation) {
    const form_data = new FormData();
    form_data.append('file', fs.createReadStream(fileLocation));
  
    const request_config = {
      headers: {
        "filename": fileName,
        "image_type": fileType,
        "page_id": page_id,
        "loadtime": endTime - startTime - 500,
        "serial_id": serial_id,
        "Content-Type": "multipart/form-data"
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      data: form_data
    };
    return axios
      .post(url, form_data, request_config).catch(error => {});
  }


export {
    getUid,
    postApex,
    getUidAll
}