import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import ChangeViewBox from '../BaseComponent/ChangView';
import { UploadVideoFromDevice } from '../BaseComponent/UploadFileFromDevice';
import { FileData } from '../../../../types/FileData';
import { GenerateButton } from '../BaseComponent/GenerateButton';
import UploadNotification from '../../../UploadNotification';
import { BrowseFile } from '../BaseComponent/BrowseMLVTFile';
import { InputTextBox } from '../BaseComponent/InputTextBox';
import { SingleOptionBox } from '../BaseComponent/OptionBox';
import { transcribeVideo, uploadVideoToServer } from '../../../../utils/ProcessTriggerPopup/PipelineService';
import { TranslateLanguage } from '../../../../types/Translation';
import { LoadingDots } from '../../../StaticComponent/LoadingDot/LoadingDot';
import { TextFileType } from '../../../../types/FileType';

interface UploadNoti {
    isOpen: boolean;
    status: 'fail' | 'success';
}

export const DialogContent: React.FC = () => {
    const [viewState, setViewState] = useState<'upload' | 'enter text' | 'browse'>('enter text');
    const [deviceFile, setDeviceFile] = useState<File | null>(null);
    const [inputText, setInputText] = useState<string>('');
    const [disableGenerate, setDisableGenerate] = useState<boolean>(true);
    const [language, setLanguage] = useState<TranslateLanguage | null>(null);

    const [uploadNoti, setUploadNoti] = useState<UploadNoti>({
        isOpen: false,
        status: 'success',
    });
    const [transcriptNoti, setTranscriptNoti] = useState<UploadNoti>({
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

    const handleChangeLanguage = (value: string) => {
        if (Object.values(TranslateLanguage).includes(value as TranslateLanguage)) {
            setLanguage(value as TranslateLanguage);
        }
    };

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
                    setTranscriptNoti({ isOpen: true, status: 'success' });
                } catch {
                    setTranscriptNoti({ isOpen: true, status: 'fail' });
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
        if (['upload', 'enter text', 'browse'].includes(view)) {
            setViewState(view as 'upload' | 'enter text' | 'browse');
        }
    };

    const Views = useMemo(
        () => [
            {
                text: 'ENTER TEXT',
                viewState: 'enter text',
                handleSubmit: () => console.log('click submit enter text'),
                component: <InputTextBox inputTextFromParent={inputText} handleChangeText={setInputText} />,
            },
            {
                text: 'UPLOAD',
                viewState: 'upload',
                handleSubmit: handleGenerateFileFromDevice,
                component: (
                    <UploadVideoFromDevice
                        selectedFile={deviceFile}
                        handleChangeSelectedFile={handleChangeDeviceFile}
                        handleChangeFileData={handleChangeFileData}
                        fileTypeList={[TextFileType.PlainText]}
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
        [deviceFile, handleChangeFileData, handleGenerateFileFromDevice, inputText]
    );

    useEffect(() => {
        if (viewState === 'enter text') {
            if (!language || !inputText) {
                setDisableGenerate(true);
            } else {
                setDisableGenerate(false);
            }
        } else if (viewState === 'upload') {
            if (!deviceFile || !language) {
                setDisableGenerate(true);
            } else {
                setDisableGenerate(false);
            }
        } else if (viewState === 'browse') {
            if (!language) {
                setDisableGenerate(true);
            }
        }
    }, [language, inputText, viewState, deviceFile]);

    useEffect(() => {
        console.log('Input text is set: ', inputText);
    }, [inputText]);

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
                    marginBottom: '10px',
                }}
            >
                <ChangeViewBox Views={Views} setViewState={changeViewState} />
                {ActiveComponent}
            </Box>
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
                customSx={{ width: '100%' }}
                handleChangeOption={handleChangeLanguage}
            />
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
