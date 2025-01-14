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
import { AudioFileType } from '../../../../types/FileType';

interface UploadNoti {
    isOpen: boolean;
    status: 'fail' | 'success';
}

export const DialogContent: React.FC = () => {
    const buildinVoiceList = ['Voice 1', 'Voice 2', 'Voice 3'];
    type BuildinVoice = (typeof buildinVoiceList)[number];

    const [buildinVoice, setBuildinVoice] = useState<BuildinVoice | null>('Voice 1');
    const [viewState, setViewState] = useState<'build-in' | 'custom'>('build-in');
    const [deviceFile, setDeviceFile] = useState<File | null>(null);
    const [inputText, setInputText] = useState<string>('');
    const [disableGenerate, setDisableGenerate] = useState<boolean>(true);
    const [audioLanguage, setAudioLanguage] = useState<TranslateLanguage | null>(null);

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

    const handleChangeAudioLanguage = (value: string) => {
        if (Object.values(TranslateLanguage).includes(value as TranslateLanguage)) {
            setAudioLanguage(value as TranslateLanguage);
        }
    };

    const handleChangeBuildinVoice = useCallback(
        (voice: string) => {
            if (buildinVoiceList.includes(voice as BuildinVoice)) {
                setBuildinVoice(voice as BuildinVoice);
            }
        },
        [buildinVoiceList]
    );

    const handleChangeFileData = useCallback((update: Partial<FileData>) => {
        setFileData((prevData) => ({
            ...prevData,
            ...update,
        }));
    }, []);

    const handleChangeDeviceFile = (file: File | null) => {
        setDeviceFile(file);
    };

    const voiceGeneration = async (file: File, data: FileData) => {
        if (file) {
            setIsLoading(true);
            setDisableGenerate(true);
            try {
                const videoId = await uploadVideoToServer(file, data);
                setUploadNoti({ isOpen: true, status: 'success' });
            } catch {
                setUploadNoti({ isOpen: true, status: 'fail' });
            } finally {
                setIsLoading(false);
                setDisableGenerate(false);
            }
        }
    };

    const handleCloseStatusPopup = () => {
        setUploadNoti((prevData) => ({ ...prevData, isOpen: false }));
    };

    const changeViewState = (view: string) => {
        if (['build-in', 'custom'].includes(view)) {
            setViewState(view as 'build-in' | 'custom');
        }
    };

    const Views = useMemo(
        () => [
            {
                text: 'BUILD-IN VOICE',
                viewState: 'build-in',
                component: (
                    <SingleOptionBox
                        choices={buildinVoiceList}
                        handleChangeOption={handleChangeBuildinVoice}
                        customSx={{ width: '100%' }}
                        initChoice={buildinVoice || ''}
                    />
                ),
            },
            {
                text: 'CUSTOM VOICE',
                viewState: 'custom',
                handleSubmit: () => console.log('Browse MLVT clicked'),
                component: (
                    <UploadVideoFromDevice
                        handleChangeFileData={handleChangeFileData}
                        selectedFile={deviceFile}
                        fileTypeList={[AudioFileType.WAV]}
                        handleChangeSelectedFile={handleChangeDeviceFile}
                    />
                ),
            },
        ],
        [buildinVoiceList, buildinVoice, handleChangeBuildinVoice, deviceFile, handleChangeFileData]
    );

    useEffect(() => {}, [buildinVoice]);

    const activeView = Views.find((view) => view.viewState === viewState);
    const ActiveComponent = activeView?.component || null;
    const handleGenerate = activeView?.handleSubmit || (() => Promise.resolve());

    return (
        <>
            {/* Box for user to enter text */}
            <InputTextBox inputTextFromParent={inputText} handleChangeText={setInputText} />

            {/* Translation to section */}
            <Typography
                variant="body2"
                sx={{
                    fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif',
                    fontWeight: 'bold',
                    marginTop: '20px',
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
                handleChangeOption={handleChangeAudioLanguage}
                customSx={{ width: '100%' }}
            />

            <Typography
                variant="body2"
                sx={{
                    fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif',
                    fontWeight: 'bold',
                    marginTop: '15px',
                    marginBottom: '10px',
                }}
            >
                Voice Generation option:
            </Typography>

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
