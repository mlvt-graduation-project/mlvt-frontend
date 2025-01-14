import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Box } from '@mui/material';
import ChangeViewBox from '../BaseComponent/ChangView';
import { UploadVideoFromDevice } from '../BaseComponent/UploadFileFromDevice';
import { UploadVideoFromUrl } from '../BaseComponent/UploadVideoURL';
import { FileData } from '../../../../types/FileData';
import { checkValidUrl } from '../../../../utils/ProjectPopup/CheckValidUrl';
import { GenerateButton } from '../BaseComponent/GenerateButton';
import UploadNotification from '../../../UploadNotification';
import { BrowseFile } from '../BaseComponent/BrowseMLVTFile';
import { transcribeVideo, uploadVideoToServer } from '../../../../utils/ProcessTriggerPopup/PipelineService';
import { LoadingDots } from '../../../StaticComponent/LoadingDot/LoadingDot';
import { VideoFileType } from '../../../../types/FileType';

interface UploadNoti {
    isOpen: boolean;
    status: 'fail' | 'success';
}

export const DialogContent: React.FC = () => {
    const [viewState, setViewState] = useState<'upload' | 'url' | 'browse'>('upload');
    const [deviceFile, setDeviceFile] = useState<File | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
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

    const videoTranscription = async (file: File, data: FileData) => {
        if (file) {
            setIsLoading(true);
            setDisableGenerate(true);
            try {
                const videoId = await uploadVideoToServer(file, data);
                setUploadNoti({ isOpen: true, status: 'success' });
                try {
                    await transcribeVideo(videoId);
                } catch {
                    console.log('Error when transcribing video');
                }
            } catch {
                setUploadNoti({ isOpen: true, status: 'fail' });
            } finally {
                setIsLoading(false);
                setDisableGenerate(false);
            }
        }
    };

    const handleGenerateFileFromDevice = useCallback(async () => {
        if (deviceFile) {
            await videoTranscription(deviceFile, fileData);
        }
    }, [deviceFile, fileData]);

    const handleCloseStatusPopup = () => {
        setUploadNoti((prevData) => ({ ...prevData, isOpen: false }));
    };

    const changeViewState = (view: string) => {
        if (['upload', 'url', 'browse'].includes(view)) {
            setViewState(view as 'upload' | 'url' | 'browse');
        }
    };

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
            if (!videoUrl) {
                setDisableGenerate(true);
            } else {
                setDisableGenerate(false);
            }
        } else if (viewState === 'upload') {
            if (!deviceFile) {
                setDisableGenerate(true);
            } else {
                setDisableGenerate(false);
            }
        } else if (viewState === 'browse') {
            setDisableGenerate(true);
        }
    }, [viewState, deviceFile, videoUrl]);

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
