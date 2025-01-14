import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ChangeViewBox from '../BaseComponent/ChangView';
import { UploadVideoFromDevice } from '../BaseComponent/UploadFileFromDevice';
import { UploadVideoFromUrl } from '../BaseComponent/UploadVideoURL';
import { FileData } from '../../../../types/FileData';
import { GenerateButton } from '../BaseComponent/GenerateButton';
import UploadNotification from '../../../UploadNotification';
import { SingleOptionBox } from '../BaseComponent/OptionBox';
import { BrowseFile } from '../BaseComponent/BrowseMLVTFile';
import { TranslateLanguage } from '../../../../types/Translation';
import { LoadingDots } from '../../../StaticComponent/LoadingDot/LoadingDot';
import { AudioFileType, VideoFileType } from '../../../../types/FileType';

interface UploadNoti {
    isOpen: boolean;
    status: 'fail' | 'success';
}

const defaultFileData = {
    title: 'My Video Title',
    duration: 300,
    description: 'A description of the video',
    file_name: '',
    folder: 'raw_videos',
    image: 'avatar.jpg',
    user_id: parseInt(localStorage.getItem('userId') || '0'),
};

const modelList = ['Model 1', 'Model 2', 'Model 3'];

export const DialogContent: React.FC = () => {
    type modelType = (typeof modelList)[number];
    const [model, setModel] = useState<modelType | null>('Model 1');
    const [audioLanguage, setAudioLanguage] = useState<TranslateLanguage | null>(null);

    const [videoViewState, setVideoViewState] = useState<'upload' | 'url' | 'browse'>('upload');
    const [audioViewState, setAudioViewState] = useState<'upload' | 'url' | 'browse'>('upload');

    const [deviceVideo, setDeviceVideo] = useState<File | null>(null);
    const [deviceAudio, setDeviceAudio] = useState<File | null>(null);

    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const [disableGenerate, setDisableGenerate] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState(false);
    const [videoData, setVideoData] = useState<FileData>(defaultFileData);
    const [audioData, setAudioData] = useState<FileData>(defaultFileData);
    const [uploadNoti, setUploadNoti] = useState<UploadNoti>({
        isOpen: false,
        status: 'success',
    });

    const handleChangeModel = useCallback((model: string) => {
        if (modelList.includes(model as modelType)) {
            setModel(model as modelType);
        }
    }, []);

    const handleChangeAudioLanguage = (value: string) => {
        if (Object.values(TranslateLanguage).includes(value as TranslateLanguage)) {
            setAudioLanguage(value as TranslateLanguage);
        }
    };

    const handleChangeDisableGenerate = useCallback((value: boolean) => {
        setDisableGenerate(value);
    }, []);

    const handleChangeVideoData = useCallback((update: Partial<FileData>) => {
        setVideoData((prevData) => ({
            ...prevData,
            ...update,
        }));
    }, []);

    const handleChangeAudioData = useCallback((update: Partial<FileData>) => {
        setAudioData((prevData) => ({
            ...prevData,
            ...update,
        }));
    }, []);

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
        if (['upload', 'url', 'browse'].includes(view)) {
            setVideoViewState(view as 'upload' | 'url' | 'browse');
        }
    };

    const changeAudioViewState = (view: string) => {
        if (['upload', 'url', 'browse'].includes(view)) {
            setAudioViewState(view as 'upload' | 'url' | 'browse');
        }
    };

    const checkValidVideo = (
        state: 'upload' | 'url' | 'browse',
        uploadFile: File | null,
        fileURL: string | null
    ): boolean => {
        if (state === 'upload' && uploadFile) {
            return true;
        } else if (state === 'url' && fileURL) {
            return true;
        } else if (state === 'browse') {
            return false;
        }
        return false;
    };

    const videoViews = useMemo(
        () => [
            {
                text: 'UPLOAD',
                viewState: 'upload',
                handleSubmit: () => console.log('Click upload file'),
                component: (
                    <UploadVideoFromDevice
                        selectedFile={deviceVideo}
                        handleChangeSelectedFile={handleChangeDeviceVideo}
                        handleChangeFileData={handleChangeVideoData}
                        fileTypeList={[VideoFileType.MP4]}
                    />
                ),
            },
            {
                text: 'URL',
                viewState: 'url',
                handleSubmit: () => console.log('click submit url'),
                component: (
                    <UploadVideoFromUrl
                        handleChangeDisableGenerate={handleChangeDisableGenerate}
                        setURLInput={setVideoUrl}
                    />
                ),
            },
            {
                text: 'BROWSE MLVT',
                viewState: 'browse',
                handleSubmit: () => console.log('Browse MLVT clicked'),
                component: <BrowseFile />,
            },
        ],
        [deviceVideo, handleChangeVideoData, handleChangeDisableGenerate]
    );

    const audioViews = useMemo(
        () => [
            {
                text: 'UPLOAD',
                viewState: 'upload',
                handleSubmit: () => console.log('Click upload file'),
                component: (
                    <UploadVideoFromDevice
                        selectedFile={deviceAudio}
                        handleChangeSelectedFile={handleChangeDeviceAudio}
                        handleChangeFileData={handleChangeAudioData}
                        fileTypeList={[AudioFileType.WAV]}
                    />
                ),
            },
            {
                text: 'URL',
                viewState: 'url',
                handleSubmit: () => console.log('click submit url'),
                component: (
                    <UploadVideoFromUrl
                        handleChangeDisableGenerate={handleChangeDisableGenerate}
                        setURLInput={setAudioUrl}
                    />
                ),
            },
            {
                text: 'BROWSE MLVT',
                viewState: 'browse',
                handleSubmit: () => console.log('Browse MLVT clicked'),
                component: <BrowseFile />,
            },
        ],
        [deviceAudio, handleChangeAudioData, handleChangeDisableGenerate]
    );

    useEffect(() => {
        if (
            !checkValidVideo(audioViewState, deviceAudio, audioUrl) ||
            !checkValidVideo(videoViewState, deviceVideo, videoUrl) ||
            !audioLanguage ||
            !model
        ) {
            setDisableGenerate(true);
        } else {
            setDisableGenerate(false);
        }
    }, [deviceAudio, audioUrl, audioViewState, videoViewState, deviceVideo, videoUrl, audioLanguage, model]);

    const activeVideoView = videoViews.find((view) => view.viewState === videoViewState);
    const activeVideoComponent = activeVideoView?.component || null;
    const handleVideoGenerate = activeVideoView?.handleSubmit || (() => Promise.resolve());

    const activeAudioView = audioViews.find((view) => view.viewState === audioViewState);
    const activeAudioComponent = activeAudioView?.component || null;
    // const handleAudioGenerate = activeAudioView?.handleSubmit || (() => Promise.resolve());

    return (
        <>
            {/* Upload video section */}
            <Typography
                variant="body1"
                sx={{
                    fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                }}
            >
                Upload a video
            </Typography>
            <Box
                sx={{
                    padding: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: '#EBEBEB',
                }}
            >
                <ChangeViewBox Views={videoViews} setViewState={changeVideoViewState} />
                {activeVideoComponent}
            </Box>

            {/* Upload audio section */}
            <Typography
                variant="body1"
                sx={{
                    fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                    marginTop: '10px',
                }}
            >
                Upload an audio
            </Typography>
            <Box
                sx={{
                    padding: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: '#EBEBEB',
                }}
            >
                <ChangeViewBox Views={audioViews} setViewState={changeAudioViewState} />
                {activeAudioComponent}
            </Box>

            {/* Choosing audio language and model section */}
            <Box
                marginTop="10px"
                sx={{
                    display: 'flex', // Corrected typo here
                    justifyContent: 'space-between', // Push elements to opposite ends
                    alignItems: 'center', // Vertically align items
                    width: '100%', // Ensure full width for alignment
                }}
            >
                {/* Choosing audio language seciton */}
                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif',
                            fontWeight: 'bold',
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
                    />
                </Box>
                {/* choosing model section */}
                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif',
                            fontWeight: 'bold',
                        }}
                    >
                        Model:
                    </Typography>
                    <SingleOptionBox choices={modelList} handleChangeOption={handleChangeModel} />
                </Box>
            </Box>

            {/* Render loading dot when loading */}
            {isLoading && <LoadingDots content="Uploading video" />}

            {/* Generate button */}
            <GenerateButton isDisable={disableGenerate} handleGenerate={handleVideoGenerate} />

            {/* Notification on generate's result */}
            <UploadNotification
                isOpen={uploadNoti['isOpen']}
                uploadStatus={uploadNoti['status']}
                onClose={handleCloseStatusPopup}
                content={null}
            />
        </>
    );
};
