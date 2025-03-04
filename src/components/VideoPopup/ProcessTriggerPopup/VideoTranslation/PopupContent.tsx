import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ChangeViewBox from '../BaseComponent/ChangView';
import { UploadFileFromDevice } from '../BaseComponent/UploadFileFromDevice';
import { UploadVideoFromUrl } from '../BaseComponent/UploadVideoURL';
import { FileData, VideoData } from '../../../../types/FileData';
import { GenerateButton } from '../BaseComponent/GenerateButton';
import UploadNotification from '../../../UploadNotification';
import { SingleOptionBox } from '../BaseComponent/OptionBox';
import { BrowseFile } from '../BaseComponent/BrowseMLVTFile';
import { TranslateLanguage } from '../../../../types/Translation';
import { LoadingDots } from '../../../StaticComponent/LoadingDot/LoadingDot';
import { VideoFileType } from '../../../../types/FileType';
import { translateVideo } from '../../../../utils/ProcessTriggerPopup/PipelineService';
import { uploadVideo } from '../../../../utils/ProcessTriggerPopup/VideoService';
import { useAuth } from '../../../../context/AuthContext';
import { S3Folder } from '../../../../types/S3FolderStorage';
import { ProjectType, RawVideo, Project } from '../../../../types/Project';
import { checkValidGenerate } from '../../../../utils/ProcessTriggerPopup/CheckValidGenerate';

interface UploadNoti {
    isOpen: boolean;
    status: 'fail' | 'success';
}

export const DialogContent: React.FC = () => {
    const { userId } = useAuth();
    const parsedUserId = userId ? parseInt(userId) : 0;
    const [viewState, setViewState] = useState<'upload' | 'url' | 'browse'>('upload');
    const [sourceLanguage, setSourceLanguage] = useState<TranslateLanguage | null>(null);
    const [deviceFile, setDeviceFile] = useState<File | null>(null);
    const [MLVTVideo, setMLVTVideo] = useState<RawVideo | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [targetLanguage, setTargetLanguage] = useState<TranslateLanguage | null>(null);
    const [disableGenerate, setDisableGenerate] = useState<boolean>(true);
    const [uploadNoti, setUploadNoti] = useState<UploadNoti>({
        isOpen: false,
        status: 'success',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [fileData, setFileData] = useState<VideoData>({
        title: 'My Video Title',
        duration: 300,
        description: 'A description of the video',
        file_name: '',
        folder: S3Folder.video,
        image: 'avatar.jpg',
        user_id: parsedUserId,
    });

    const handleChangeSourceLanguage = (value: string) => {
        if (Object.values(TranslateLanguage).includes(value as TranslateLanguage)) {
            setSourceLanguage(value as TranslateLanguage);
        }
    };

    const handleChangeTargetLanguage = (value: string) => {
        if (Object.values(TranslateLanguage).includes(value as TranslateLanguage)) {
            setTargetLanguage(value as TranslateLanguage);
        }
    };

    const handleChangeDisableGenerate = useCallback((value: boolean) => {
        setDisableGenerate(value);
    }, []);

    const handleChangeFileData = useCallback((update: Partial<VideoData>) => {
        setFileData((prevData) => ({
            ...prevData,
            ...update,
        }));
    }, []);

    const handleChangeDeviceFile = (file: File | null) => {
        setDeviceFile(file);
    };

    const handleChangeMLVTVideo = useCallback(
        (input: Project | null) => {
            if (input && input.type_project !== ProjectType.Video) return; // Ensure it's an audio project
            setMLVTVideo(input as RawVideo | null);
        },
        [setMLVTVideo]
    );

    const handleCloseStatusPopup = () => {
        setUploadNoti((prevData) => ({ ...prevData, isOpen: false }));
    };

    const changeViewState = (view: string) => {
        if (['upload', 'url', 'browse'].includes(view)) {
            setViewState(view as 'upload' | 'url' | 'browse');
        }
    };

    const uploadVideoFromDevice = useCallback(async (): Promise<number> => {
        if (deviceFile) {
            try {
                const videoId = await uploadVideo(deviceFile, fileData);
                return videoId;
            } catch (error) {
                throw error;
            }
        } else {
            throw new Error('Failed uploading Video file to Server');
        }
    }, [deviceFile, fileData]);

    const Views = useMemo(
        () => [
            {
                text: 'UPLOAD',
                viewState: 'upload',
                handleSubmit: uploadVideoFromDevice,
                component: (
                    <UploadFileFromDevice
                        selectedFile={deviceFile}
                        handleChangeSelectedFile={handleChangeDeviceFile}
                        handleChangeFileData={handleChangeFileData}
                        fileTypeList={[VideoFileType.MP4]}
                    />
                ),
            },
            {
                text: 'URL',
                viewState: 'url',
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
                handleSubmit: MLVTVideo !== null ? () => Promise.resolve(MLVTVideo.id) : undefined,
                component: (
                    <BrowseFile
                        allowTypes={[ProjectType.Video]}
                        handleChangeSelectedProject={handleChangeMLVTVideo}
                        selectedProject={MLVTVideo}
                    />
                ),
            },
        ],
        [
            deviceFile,
            handleChangeFileData,
            handleChangeDisableGenerate,
            handleChangeMLVTVideo,
            MLVTVideo,
            uploadVideoFromDevice,
        ]
    );

    useEffect(() => {
        if (!checkValidGenerate(viewState, deviceFile, videoUrl, MLVTVideo) || !sourceLanguage || !targetLanguage) {
            setDisableGenerate(true);
        } else {
            setDisableGenerate(false);
        }
    }, [viewState, deviceFile, videoUrl, sourceLanguage, targetLanguage, MLVTVideo]);

    const activeView = Views.find((view) => view.viewState === viewState);
    const ActiveComponent = activeView?.component || null;
    const handleViewGenerate: (() => Promise<number>) | undefined = activeView?.handleSubmit;

    const handleGenerate = useCallback(async () => {
        let videoId: number | undefined = undefined;
        try {
            setIsLoading(true);
            setDisableGenerate(true);

            const textPromise = handleViewGenerate ? handleViewGenerate() : Promise.resolve(undefined);

            // Run both promises in parallel
            videoId = await textPromise;
            setUploadNoti({ isOpen: true, status: 'success' });
            try {
                if (videoId && sourceLanguage && targetLanguage) {
                    translateVideo(videoId, sourceLanguage, targetLanguage);
                } else throw new Error('videoId or textLanguage or targetLanguage is null');
            } catch (error) {
                console.error('Error handling Text Generation process');
            }
        } catch (error) {
            console.error('Uploading files to server failed', error);
            setUploadNoti({ isOpen: true, status: 'fail' });
        } finally {
            setIsLoading(false);
            setDisableGenerate(false);
        }
    }, [handleViewGenerate, sourceLanguage, targetLanguage]);

    return (
        <>
            <Box
                sx={{
                    padding: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: '#EBEBEB',
                }}
            >
                <ChangeViewBox Views={Views} setViewState={changeViewState} />
                {ActiveComponent}
            </Box>
            <Box
                marginTop="10px"
                sx={{
                    display: 'flex', // Corrected typo here
                    justifyContent: 'space-between', // Push elements to opposite ends
                    alignItems: 'center', // Vertically align items
                    width: '100%', // Ensure full width for alignment
                }}
            >
                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif',
                            fontWeight: 'bold',
                        }}
                    >
                        Video's language:
                    </Typography>
                    <SingleOptionBox
                        choices={[
                            TranslateLanguage.English,
                            TranslateLanguage.Vietnamese,
                            TranslateLanguage.French,
                            TranslateLanguage.Japanese,
                        ]}
                        handleChangeOption={handleChangeSourceLanguage}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="body2"
                        sx={{
                            fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif',
                            fontWeight: 'bold',
                        }}
                    >
                        Translate to:
                    </Typography>
                    <SingleOptionBox
                        choices={[
                            TranslateLanguage.English,
                            TranslateLanguage.Vietnamese,
                            TranslateLanguage.French,
                            TranslateLanguage.Japanese,
                        ]}
                        handleChangeOption={handleChangeTargetLanguage}
                    />
                </Box>
            </Box>

            {isLoading && <LoadingDots content="Uploading video" />}

            <GenerateButton isDisable={disableGenerate} handleGenerate={handleGenerate} />
            <UploadNotification
                isOpen={uploadNoti['isOpen']}
                uploadStatus={uploadNoti['status']}
                onClose={handleCloseStatusPopup}
                content={null}
            />
        </>
    );
};
