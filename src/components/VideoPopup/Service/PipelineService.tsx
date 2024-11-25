import { uploadVideo, uploadVideoImage, extractFirstFrame} from "./VideoService"
import { postVideoTranscription } from "../../../api/video.api"
import { FileData } from "../../../types/FileData"

export const uploadVideoToServer = async (file: File, fileData: FileData): Promise<number> => {
    let videoId: number | null = null;

    try {
        if (file.type.includes('video')) {
        const imageFile = await extractFirstFrame(file);
        await uploadVideoImage(imageFile);
        }
        videoId = await uploadVideo(fileData, file, file.type);
        if (!videoId){
            throw new Error ("Cannot receive video when uploading video to server")
        }
        return videoId;
    } catch (error) {
        throw error
    }
};

export const transcribeVideo = async (videoId: number) => {
    try {
        const postTranscriptionResponse = await postVideoTranscription(videoId);

        if (postTranscriptionResponse.status !== 201) {
            throw new Error ("Error when transcribing video")
        }
    } catch (error) {
        throw error
    }
}