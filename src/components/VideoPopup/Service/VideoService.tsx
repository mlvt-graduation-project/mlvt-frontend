import { FileData } from "../../../types/FileData";
import { putImageS3, putVideoS3 } from "../../../api/aws.api";
import { postVideo } from "../../../api/video.api";
import { getPresignedVideoURL, getPresignedImageURL } from "../../../api/video.api";

export const getVideoDuration = (file: File) : Promise<number> => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';

        const fileURL = URL.createObjectURL(file);
        video.src = fileURL;

        video.onloadedmetadata = () => {
            URL.revokeObjectURL(fileURL); 
            resolve(Math.floor(video.duration)); 
        };

        video.onerror = () => {
            URL.revokeObjectURL(fileURL);
            reject(new Error("Failed to load video metadata"));
        };
    });
};

export const extractFirstFrame = (videoFile: File): Promise<File> => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.src = URL.createObjectURL(videoFile);
        video.currentTime = 0.1;

        const parts = videoFile.name.split('.');
        parts.pop();
        const imageName = parts.join('.');

        video.onloadeddata = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');

            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    if (blob) {
                        const imageFile = new File([blob], `${imageName}_thumbnail.jpg`, { type: 'image/jpeg' });
                        resolve(imageFile);
                    } else {
                        reject(new Error("Could not generate image from canvas"));
                    }
                }, 'image/jpeg');
            } else {
                reject(new Error("Failed to get 2D context from canvas"));
            }
        };

        video.onerror = (error) => {
            reject(error);
        };
    });
};

export const uploadVideoImage = async (file: File) => {
    try {
        const responsegetPresignedImageURL = await getPresignedImageURL(`${file.name}`, 'image/jpg');
        if (responsegetPresignedImageURL.status === 200) {
            const s3UploadImageResponse = await putImageS3(responsegetPresignedImageURL.data.upload_url, file)
            if (s3UploadImageResponse.status !== 200) {
                throw new Error ("Failed uploading image to S3 bucket")
            }
        }
        else throw new Error ("Failed getting presigned image from server")
    } catch (error) {
        throw error
    }
}

export const uploadVideo = async (fileData: FileData, file: File, fileType: string) => {
    try {
        const postVideoResponse = await postVideo(fileData);
        if (postVideoResponse.status !== 201) {
            throw new Error ("Post video to server failed")
        }

        const getPresignedVideoResponse = await getPresignedVideoURL(file.name, fileType)

        if (getPresignedVideoResponse.status === 200) {
            const s3UploadVideoResponse = await putVideoS3(getPresignedVideoResponse.data.upload_url, file, fileType)
            if (s3UploadVideoResponse.status !== 200) {
                throw new Error ("Upload video to s3 failed")
            }
        }
        return postVideoResponse.data.id;
    } catch (error) {
        throw error
    }
}