const FormData = require('form-data');     
// import fetch from 'node-fetch'

export const sendFileToBackend = async (files) => {
    try {
        const body = new FormData();
        for(const file of files) {
            body.append("file", file);
        }
    
        const query  = {
          method: "POST",
        //   mode:  "no-cors", // 'cors' by default
          body,
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
        } as any
        
        const response = await fetch("http://192.168.1.13:8001/file/uploadMultiFiles", query );
        const fileDetails = await response.json();
   
        return fileDetails

    } catch(err){
        throw new Error(err)
    }
}