import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ChangeViewBox from "../BaseComponent/ChangeView";
import { UploadFileFromDevice } from "../BaseComponent/UploadFileFromDevice";
import { UploadVideoFromUrl } from "../BaseComponent/UploadVideoURL";
import { VideoData } from "../../../../types/FileData";
import { GenerateButton } from "../BaseComponent/GenerateButton";
import UploadNotification from "../../../UploadNotification";
import { SingleOptionBox } from "../BaseComponent/OptionBox";
import { BrowseFile } from "../BaseComponent/BrowseMLVTFile";
import { TranslateLanguage } from "../../../../types/Translation";
import { LoadingDots } from "../../../StaticComponent/LoadingDot/LoadingDot";
import { AudioFileType, VideoFileType } from "../../../../types/FileType";
import { useAuth } from "../../../../context/AuthContext";
import { AudioData } from "../../../../types/FileData";
import { S3Folder } from "../../../../types/S3FolderStorage";
import { uploadAudio } from "../../../../utils/ProcessTriggerPopup/AudioService";
import { uploadVideo } from "../../../../utils/ProcessTriggerPopup/VideoService";
import {
    ProjectType,
    RawAudio,
    RawVideo,
    Project,
} from "../../../../types/Project";
import { checkValidGenerate } from "../../../../utils/ProcessTriggerPopup/CheckValidGenerate";
import { postLipSync } from "../../../../api/pipeline.api";
import { lipSync } from "../../../../utils/ProcessTriggerPopup/PipelineService";
import { getLanguageCode } from "../../../../utils/ProcessTriggerPopup/VideoPopup.utils";

interface UploadNoti {
    isOpen: boolean;
    status: "fail" | "success";
}

const modelList = ["Model 1", "Model 2", "Model 3"];

export const DialogContent: React.FC = () => {
    type modelType = (typeof modelList)[number];
    const { userId } = useAuth();
    const parsedUserId = userId ? parseInt(userId) : 0;
    const [model, setModel] = useState<modelType | null>("Model 1");
    const [audioLanguage, setAudioLanguage] =
        useState<TranslateLanguage | null>(null);

    const [videoViewState, setVideoViewState] = useState<
        "upload" | "url" | "browse"
    >("upload");
    const [audioViewState, setAudioViewState] = useState<
        "upload" | "url" | "browse"
    >("upload");

    const [deviceVideo, setDeviceVideo] = useState<File | null>(null);
    const [deviceAudio, setDeviceAudio] = useState<File | null>(null);

    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const [MLVTAudio, setMLVTAudio] = useState<RawAudio | null>(null);
    const [MLVTVideo, setMLVTVideo] = useState<RawVideo | null>(null);

    const [disableGenerate, setDisableGenerate] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState(false);
    const [videoData, setVideoData] = useState<VideoData>({
        title: "My Video Title",
        duration: 300,
        description: "A description of the video",
        file_name: "",
        folder: S3Folder.video,
        image: "avatar.jpg",
        user_id: parsedUserId,
    });
    const [audioData, setAudioData] = useState<AudioData>({
        file_name: "",
        folder: S3Folder.audio,
        user_id: parsedUserId,
        duration: 0,
    });
    const [uploadNoti, setUploadNoti] = useState<UploadNoti>({
        isOpen: false,
        status: "success",
    });

    const handleChangeModel = useCallback((model: string) => {
        if (modelList.includes(model as modelType)) {
            setModel(model as modelType);
        }
    }, []);

    const handleChangeAudioLanguage = (value: string) => {
        if (
            Object.values(TranslateLanguage).includes(
                value as TranslateLanguage
            )
        ) {
            setAudioLanguage(value as TranslateLanguage);
        }
    };

    const handleChangeDisableGenerate = useCallback((value: boolean) => {
        setDisableGenerate(value);
    }, []);

    const handleChangeVideoData = useCallback((update: Partial<VideoData>) => {
        setVideoData((prevData) => ({
            ...prevData,
            ...update,
        }));
    }, []);

    const handleChangeAudioData = useCallback((update: Partial<AudioData>) => {
        setAudioData((prevData) => ({
            ...prevData,
            ...update,
        }));
    }, []);

    const handleChangeMLVTAudio = useCallback(
        (input: Project | null) => {
            if (input && input.type_project !== ProjectType.Audio) return;
            setMLVTAudio(input as RawAudio | null);
        },
        [setMLVTAudio]
    );

    const handleChangeMLVTVideo = useCallback(
        (input: Project | null) => {
            if (input && input.type_project !== ProjectType.Video) return;
            setMLVTVideo(input as RawVideo | null);
        },
        [setMLVTVideo]
    );

    const handleChangeDeviceVideo = (file: File | null) => {
        setDeviceVideo(file);
    };

    const handleChangeDeviceAudio = (file: File | null) => {
        setDeviceAudio(file);
    };

    const handleCloseStatusPopup = () => {
        setUploadNoti((prevData) => ({ ...prevData, isOpen: false }));
    };

    const changeVideoViewState = (view: string) => {
        if (["upload", "url", "browse"].includes(view)) {
            setVideoViewState(view as "upload" | "url" | "browse");
        }
    };

    const changeAudioViewState = (view: string) => {
        if (["upload", "url", "browse"].includes(view)) {
            setAudioViewState(view as "upload" | "url" | "browse");
        }
    };

    const uploadAudioFromDevice = useCallback(async (): Promise<number> => {
        if (deviceAudio && audioLanguage) {
            try {
                handleChangeAudioData({ lang: getLanguageCode(audioLanguage) });
                const audioId = await uploadAudio(deviceAudio, audioData);
                return audioId;
            } catch (error) {
                throw error;
            }
        } else {
            throw new Error("Failed uploading Audio file to Server");
        }
    }, [deviceAudio, audioData, handleChangeAudioData, audioLanguage]);

    const uploadVideoFromDevice = useCallback(async (): Promise<number> => {
        if (deviceVideo) {
            try {
                const videoId = await uploadVideo(deviceVideo, videoData);
                return videoId;
            } catch (error) {
                throw error;
            }
        } else {
            throw new Error("Failed uploading Video file to Server");
        }
    }, [deviceVideo, videoData]);

    const videoViews = useMemo(
        () => [
            {
                text: "UPLOAD",
                viewState: "upload",
                handleSubmit: uploadVideoFromDevice,
                component: (
                    <UploadFileFromDevice
                        selectedFile={deviceVideo}
                        handleChangeSelectedFile={handleChangeDeviceVideo}
                        handleChangeFileData={handleChangeVideoData}
                        fileTypeList={[VideoFileType.MP4]}
                    />
                ),
            },
            {
                text: "URL",
                viewState: "url",
                component: (
                    <UploadVideoFromUrl
                        handleChangeDisableGenerate={
                            handleChangeDisableGenerate
                        }
                        setURLInput={setVideoUrl}
                    />
                ),
            },
            {
                text: "BROWSE MLVT",
                viewState: "browse",
                component: (
                    <BrowseFile
                        allowTypes={[ProjectType.Video]}
                        handleChangeSelectedProject={handleChangeMLVTVideo}
                        selectedProject={MLVTVideo}
                    />
                ),
                handleSubmit:
                    MLVTVideo !== null
                        ? () => Promise.resolve(MLVTVideo.id)
                        : undefined,
            },
        ],
        [
            deviceVideo,
            handleChangeVideoData,
            handleChangeDisableGenerate,
            uploadVideoFromDevice,
            handleChangeMLVTVideo,
            MLVTVideo,
        ]
    );

    const audioViews = useMemo(
        () => [
            {
                text: "UPLOAD",
                viewState: "upload",
                handleSubmit: uploadAudioFromDevice,
                component: (
                    <UploadFileFromDevice
                        selectedFile={deviceAudio}
                        handleChangeSelectedFile={handleChangeDeviceAudio}
                        handleChangeFileData={handleChangeAudioData}
                        fileTypeList={[AudioFileType.MP3]}
                    />
                ),
            },
            {
                text: "URL",
                viewState: "url",
                component: (
                    <UploadVideoFromUrl
                        handleChangeDisableGenerate={
                            handleChangeDisableGenerate
                        }
                        setURLInput={setAudioUrl}
                    />
                ),
            },
            {
                text: "BROWSE MLVT",
                viewState: "browse",
                component: (
                    <BrowseFile
                        allowTypes={[ProjectType.Audio]}
                        handleChangeSelectedProject={handleChangeMLVTAudio}
                        selectedProject={MLVTAudio}
                    />
                ),
                handleSubmit:
                    MLVTAudio !== null
                        ? () => Promise.resolve(MLVTAudio.id)
                        : undefined,
            },
        ],
        [
            deviceAudio,
            handleChangeAudioData,
            handleChangeDisableGenerate,
            uploadAudioFromDevice,
            handleChangeMLVTAudio,
            MLVTAudio,
        ]
    );

    useEffect(() => {
        if (
            !checkValidGenerate(
                audioViewState,
                deviceAudio,
                audioUrl,
                MLVTAudio
            ) ||
            !checkValidGenerate(
                videoViewState,
                deviceVideo,
                videoUrl,
                MLVTVideo
            ) ||
            !audioLanguage ||
            !model
        ) {
            setDisableGenerate(true);
        } else {
            setDisableGenerate(false);
        }
    }, [
        deviceAudio,
        audioUrl,
        audioViewState,
        videoViewState,
        deviceVideo,
        videoUrl,
        audioLanguage,
        model,
        MLVTAudio,
        MLVTVideo,
    ]);

    const activeVideoView = videoViews.find(
        (view) => view.viewState === videoViewState
    );
    const activeVideoComponent = activeVideoView?.component || null;
    const handleVideoGenerate: (() => Promise<number>) | undefined =
        activeVideoView?.handleSubmit;

    const activeAudioView = audioViews.find(
        (view) => view.viewState === audioViewState
    );
    const activeAudioComponent = activeAudioView?.component || null;
    const handleAudioGenerate: (() => Promise<number>) | undefined =
        activeAudioView?.handleSubmit;

    const handleGenerate = useCallback(async () => {
        let videoId: number | undefined = undefined;
        let audioId: number | undefined = undefined;
        try {
            setIsLoading(true);
            setDisableGenerate(true);

            const videoPromise = handleVideoGenerate
                ? handleVideoGenerate()
                : Promise.resolve(undefined);
            const audioPromise = handleAudioGenerate
                ? handleAudioGenerate()
                : Promise.resolve(undefined);

            // Run both promises in parallel
            [videoId, audioId] = await Promise.all([
                videoPromise,
                audioPromise,
            ]);
            setUploadNoti({ isOpen: true, status: "success" });
            try {
                if (videoId && audioId) {
                    lipSync(videoId, audioId);
                }
            } catch (error) {
                console.error("Error handling Lipsync process");
            }
        } catch (error) {
            console.error("Uploading files to server failed", error);
            setUploadNoti({ isOpen: true, status: "fail" });
        } finally {
            setIsLoading(false);
            setDisableGenerate(false);
        }
    }, [handleAudioGenerate, handleVideoGenerate]);

    return (
        <>
            {/* Upload video section */}
            <Typography
                variant="body2"
                sx={{
                    fontFamily:
                        "Poppins, Inter, Araboto, Roboto, Arial, sans-serif",
                    fontWeight: 500,
                    marginBottom: "10px",
                }}
            >
                Upload a video
            </Typography>
            <Box
                sx={{
                    padding: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: (theme) => theme.palette.background.paper,
                }}
            >
                <ChangeViewBox
                    Views={videoViews}
                    setViewState={changeVideoViewState}
                />
                {activeVideoComponent}
            </Box>

            {/* Upload audio section */}
            <Typography
                variant="body2"
                sx={{
                    fontFamily:
                        "Poppins, Inter, Araboto, Roboto, Arial, sans-serif",
                    fontWeight: 500,
                    marginBottom: "10px",
                    marginTop: "10px",
                }}
            >
                Upload an audio
            </Typography>
            <Box
                sx={{
                    padding: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: (theme) => theme.palette.background.paper,
                }}
            >
                <ChangeViewBox
                    Views={audioViews}
                    setViewState={changeAudioViewState}
                />
                {activeAudioComponent}
            </Box>

            {/* Choosing audio language and model section */}
            <Box
                marginTop="10px"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                {/* Choosing audio language seciton */}
                <Box paddingX={1.5}>
                    <Typography
                        variant="body2"
                        sx={{
                            marginBottom: "10px",
                            marginTop: "15px",
                            fontFamily: "Poppins, sans-serif",
                        }}
                    >
                        Audio language:
                    </Typography>
                    <SingleOptionBox
                        choices={[
                            TranslateLanguage.English,
                            TranslateLanguage.Vietnamese,
                            TranslateLanguage.French,
                            TranslateLanguage.Japanese,
                        ]}
                        handleChangeOption={handleChangeAudioLanguage}
                        initChoice={TranslateLanguage.English}
                    />
                </Box>
                {/* choosing model section */}
                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            marginBottom: "10px",
                            marginTop: "15px",
                            fontFamily: "Poppins, sans-serif",
                        }}
                    >
                        Model:
                    </Typography>
                    <SingleOptionBox
                        choices={modelList}
                        handleChangeOption={handleChangeModel}
                        initChoice={modelList[0]}
                    />
                </Box>
            </Box>

            {/* Render loading dot when loading */}
            {isLoading && <LoadingDots content="Uploading video" />}

            {/* Generate button */}
            <GenerateButton
                isDisable={disableGenerate}
                handleGenerate={handleGenerate}
            />

            {/* Notification on generate's result */}
            <UploadNotification
                isOpen={uploadNoti["isOpen"]}
                uploadStatus={uploadNoti["status"]}
                onClose={handleCloseStatusPopup}
                content={null}
            />
        </>
    );
};
