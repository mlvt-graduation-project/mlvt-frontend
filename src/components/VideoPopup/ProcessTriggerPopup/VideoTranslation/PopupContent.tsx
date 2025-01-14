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
import { VideoFileType } from '../../../../types/FileType';
import { uploadVideoToServer, translateVideo } from '../../../../utils/ProcessTriggerPopup/PipelineService';

interface UploadNoti {
    isOpen: boolean;
    status: 'fail' | 'success';
}

export const DialogContent: React.FC = () => {
    const [viewState, setViewState] = useState<'upload' | 'url' | 'browse'>('upload');
    const [sourceLanguage, setSourceLanguage] = useState<TranslateLanguage | null>(null);
    const [deviceFile, setDeviceFile] = useState<File | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [targetLanguage, setTargetLanguage] = useState<TranslateLanguage | null>(null);
    const [disableGenerate, setDisableGenerate] = useState<boolean>(true);
    const [uploadNoti, setUploadNoti] = useState<UploadNoti>({
        isOpen: false,
        status: 'success',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [fileData, setFileData] = useState<FileData>({
        title: 'My Video Title',
        duration: 300,
        description: 'A description of the video',
        file_name: '',
        folder: 'raw_videos',
        image: 'avatar.jpg',
        user_id: parseInt(localStorage.getItem('userId') || '0'),
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

    const handleChangeFileData = useCallback((update: Partial<FileData>) => {
        setFileData((prevData) => ({
            ...prevData,
            ...update,
        }));
    }, []);

    const handleChangeDeviceFile = (file: File | null) => {
        setDeviceFile(file);
    };

    const handleCloseStatusPopup = () => {
        setUploadNoti((prevData) => ({ ...prevData, isOpen: false }));
    };

    const changeViewState = (view: string) => {
        if (['upload', 'url', 'browse'].includes(view)) {
            setViewState(view as 'upload' | 'url' | 'browse');
        }
    };

    const videoTranslation = async (
        file: File,
        data: FileData,
        sourceLanguage: TranslateLanguage,
        targetLanguage: TranslateLanguage
    ) => {
        if (file) {
            setIsLoading(true);
            setDisableGenerate(true);
            try {
                const videoId = await uploadVideoToServer(file, data);
                setUploadNoti({ isOpen: true, status: 'success' });
                try {
                    await translateVideo(videoId, sourceLanguage, targetLanguage);
                } catch {}
            } catch {
                setUploadNoti({ isOpen: true, status: 'fail' });
            } finally {
                setIsLoading(false);
                setDisableGenerate(false);
            }
        }
    };

    const handleGenerateFileFromDevice = useCallback(async () => {
        if (deviceFile && sourceLanguage && targetLanguage) {
            await videoTranslation(deviceFile, fileData, sourceLanguage, targetLanguage);
        }
    }, [deviceFile, fileData, sourceLanguage, targetLanguage]);

    const Views = useMemo(
        () => [
            {
                text: 'UPLOAD',
                viewState: 'upload',
                handleSubmit: handleGenerateFileFromDevice,
                component: (
                    <UploadVideoFromDevice
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
        [deviceFile, handleChangeFileData, handleChangeDisableGenerate, handleGenerateFileFromDevice]
    );

    useEffect(() => {
        if (viewState === 'url') {
            if (!videoUrl || !sourceLanguage || !targetLanguage) {
                setDisableGenerate(true);
            } else {
                setDisableGenerate(false);
            }
        } else if (viewState === 'upload') {
            if (!deviceFile || !sourceLanguage || !targetLanguage) {
                setDisableGenerate(true);
            } else {
                setDisableGenerate(false);
            }
        } else if (viewState === 'browse') {
            setDisableGenerate(true);
        }
    }, [viewState, deviceFile, videoUrl, sourceLanguage, targetLanguage]);

    const activeView = Views.find((view) => view.viewState === viewState);
    const ActiveComponent = activeView?.component || null;
    const handleGenerate = activeView?.handleSubmit || (() => Promise.resolve());

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
