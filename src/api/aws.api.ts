import api from './base.api';

export const putImageS3 = async (URL: string, file: File) => {
    return api
        .put(URL, file, {
            headers: {
                'Content-Type': 'image/jpg',
            },
        })
        .then((response) => response)
        .catch((error) => {
            throw error;
        });
};

export const putVideoS3 = async (URL: string, file: File, fileType: string) => {
    return api
        .put(URL, file, {
            headers: {
                'Content-Type': fileType,
            },
        })
        .then((response) => response)
        .catch((error) => {
            throw error;
        });
};

export async function getTextFileContent(downloadUrl: string): Promise<string> {
    try {
        const response = await fetch(downloadUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        const text = await response.text(); // Đọc nội dung dưới dạng text
        return text;
    } catch (error) {
        console.error('Error fetching file content:', error);
        throw error;
    }
}
