import api from './baseAPI';

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