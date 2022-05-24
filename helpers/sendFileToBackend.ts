import axios from "axios";

const FormData = require('form-data');     
// import fetch from 'node-fetch'

export const sendFileToBackend = async (files: any) => {
    try {
        const body = new FormData();
        for(const file of files) {
            body.append("file", file);
        }
    
        const request = await axios.post(`${process.env.NEXT_PUBLIC_MANAGER_HOST}/file/uploadMultiFiles`, body);
        return request.data

    } catch(err){
        throw new Error(err)
    }
}