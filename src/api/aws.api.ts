import api from './base.api';

export const putImageS3 = async (URL : string, file: File) =>{
    return api.put(URL, file, {
        headers: {
          'Content-Type': 'image/jpg',
        },
    })
    .then(response => response)
    .catch(error => {
        throw error
    })
}

export const putVideoS3 = async (URL : string, file: File, fileType: string) =>{
    console.log("File data before upload: ", file);
    return api.put(URL, file, {
        headers: {
          'Content-Type': fileType,
        },
    })
    .then(response => response)
    .catch(error => {
        throw error
    })
}