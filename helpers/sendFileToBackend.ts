const FormData = require('form-data');     
// import fetch from 'node-fetch'

export const sendFileToBackend = async (files: any) => {
    try {
        const body = new FormData();
        for(const file of files) {
            body.append("file", file);
        }
    
        const query  = {
          method: "POST",
          mode:  "no-cors", // 'cors' by default
          body,
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
        } as any
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_MANAGER_HOST}/file/uploadMultiFiles`, query );
        const fileDetails = await response.json();
   
        return fileDetails

    } catch(err){
        throw new Error(err)
    }
}