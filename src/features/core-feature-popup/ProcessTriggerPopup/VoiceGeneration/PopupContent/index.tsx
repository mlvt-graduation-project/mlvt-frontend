import { Box, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { AudioData, TextData } from '../../../../../types/FileData'
import { AudioFileType, TextFileType } from '../../../../../types/FileType'
import { Project, ProjectType, RawText } from '../../../../../types/Project'
import { S3Folder } from '../../../../../types/S3FolderStorage'
import { TranslateLanguage } from '../../../../../types/Translation'
import { BrowseFile } from '../../BaseComponent/BrowseMLVTFile'
import ChangeViewBox from '../../BaseComponent/ChangeView'
import { GenerateButton } from '../../BaseComponent/GenerateButton'
import { InputTextBox } from '../../BaseComponent/InputTextBox'
import { SingleOptionBox } from '../../BaseComponent/SingleOptionBox'
import { UploadFileFromDevice } from '../../BaseComponent/UploadFileFromDevice'

export interface VoiceGenerationData {
    textViewState: 'upload' | 'enter text' | 'browse'
    audioViewState: 'build-in' | 'custom'
    deviceAudioFile: File | null
    deviceTextFile: File | null
    inputText: string
    buildinVoice: string | null
    textLanguage: TranslateLanguage | null
    MLVTText: RawText | null
    textData: TextData
    audioData: AudioData
}

interface DialogContentProps {
    onGenerate: (data: VoiceGenerationData) => void
}

export const DialogContent: React.FC<DialogContentProps> = ({ onGenerate }) => {
    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''
    const parsedUserId = userId ? parseInt(userId) : 0
    const buildinVoiceList = useMemo(
        () => [
            'en-US-Wavenet-A',
            'en-US-Wavenet-B',
            'en-US-Wavenet-C',
            'en-US-Wavenet-D',
            'vi-VN-Wavenet-A',
            'vi-VN-Wavenet-B',
            'fr-FR-Wavenet-A',
            'fr-FR-Wavenet-B',
            'ja-JP-Wavenet-A',
            'ja-JP-Wavenet-B',
        ],
        [],
    )
    type BuildinVoice = (typeof buildinVoiceList)[number]

    const [buildinVoice, setBuildinVoice] = useState<BuildinVoice | null>(null)
    const [audioViewState, setAudioViewState] = useState<'build-in' | 'custom'>(
        'build-in',
    )
    const [textViewState, setTextViewState] = useState<
        'upload' | 'enter text' | 'browse'
    >('enter text')
    const [deviceAudioFile, setDeviceAudioFile] = useState<File | null>(null)
    const [deviceTextFile, setDeviceTextFile] = useState<File | null>(null)
    const [MLVTText, setMLVTText] = useState<RawText | null>(null)
    const [inputText, setInputText] = useState<string>('')
    const [disableGenerate, setDisableGenerate] = useState<boolean>(true)
    const [textLanguage, setTextLanguage] = useState<TranslateLanguage | null>(
        TranslateLanguage.English,
    )

    const [textData, setTextData] = useState<TextData>({
        file_name: '',
        folder: S3Folder.text,
        user_id: parsedUserId,
        lang: '',
    })

    const [audioData, setAudioData] = useState<AudioData>({
        file_name: '',
        folder: S3Folder.audio,
        user_id: parsedUserId,
        duration: 0,
    })

    const handleChangeTextLanguage = (value: string) => {
        if (
            Object.values(TranslateLanguage).includes(
                value as TranslateLanguage,
            )
        ) {
            setTextLanguage(value as TranslateLanguage)
        }
    }

    const handleChangeBuildinVoice = useCallback(
        (voice: string) => {
            if (buildinVoiceList.includes(voice as BuildinVoice)) {
                setBuildinVoice(voice as BuildinVoice)
            }
        },
        [buildinVoiceList],
    )

    const handleChangeTextData = useCallback((update: Partial<TextData>) => {
        setTextData((prevData) => ({
            ...prevData,
            ...update,
        }))
    }, [])

    const handleChangeAudioData = useCallback((update: Partial<AudioData>) => {
        setAudioData((prevData: AudioData) => ({
            ...prevData,
            ...update,
        }))
    }, [])

    const handleChangeMLVTText = useCallback(
        (input: Project | null) => {
            if (input && input.type_project !== ProjectType.Text) return // Ensure it's an audio project
            setMLVTText(input as RawText | null)
        },
        [setMLVTText],
    )

    const handleChangeDeviceTextFile = (file: File | null) => {
        setDeviceTextFile(file)
    }

    const handleChangeDeviceAudioFile = (file: File | null) => {
        setDeviceAudioFile(file)
    }

    const handleChangeAudioViewState = (view: string) => {
        if (['build-in', 'custom'].includes(view)) {
            setAudioViewState(view as 'build-in' | 'custom')
        }
    }

    const handleChangeTextViewState = (view: string) => {
        if (['upload', 'enter text', 'browse'].includes(view)) {
            setTextViewState(view as 'upload' | 'enter text' | 'browse')
        }
    }

    // const uploadTextFromDevice = useCallback(async (): Promise<number> => {
    //     if (deviceTextFile && textLanguage) {
    //         try {
    //             handleChangeTextData({ lang: getLanguageCode(textLanguage) });
    //             const textId = await uploadText(
    //                 deviceTextFile,
    //                 textData,
    //                 TextFileType.PlainText
    //             );
    //             return textId;
    //         } catch (error) {
    //             throw error;
    //         }
    //     } else {
    //         throw new Error("No file provided for translation.");
    //     }
    // }, [deviceTextFile, textData, textLanguage, handleChangeTextData]);

    // const handleGenerateEnteringText =
    //     useCallback(async (): Promise<number> => {
    //         if (inputText && textLanguage) {
    //             try {
    //                 const tmpTextData: TextData = {
    //                     file_name:
    //                         userId +
    //                         "_" +
    //                         Math.floor(Date.now() / 1000) +
    //                         ".txt",
    //                     folder: S3Folder.text,
    //                     user_id: parsedUserId,
    //                     lang: getLanguageCode(textLanguage),
    //                 };
    //                 const textId = await uploadText(
    //                     inputText,
    //                     tmpTextData,
    //                     TextFileType.PlainText
    //                 );
    //                 return textId;
    //             } catch (error) {
    //                 throw error;
    //             }
    //         } else {
    //             throw new Error("No text provided for translation.");
    //         }
    //     }, [inputText, parsedUserId, userId, textLanguage]);

    // const uploadAudioFromDevice = useCallback(async (): Promise<number> => {
    //     if (deviceAudioFile) {
    //         try {
    //             const audioId = await uploadAudio(deviceAudioFile, audioData);
    //             return audioId;
    //         } catch (error) {
    //             throw error;
    //         }
    //     } else {
    //         throw new Error("Failed uploading Audio file to Server");
    //     }
    // }, [deviceAudioFile, audioData]);

    const TextViews = useMemo(
        () => [
            {
                text: 'ENTER TEXT',
                viewState: 'enter text',
                component: (
                    <InputTextBox
                        inputTextFromParent={inputText}
                        handleChangeText={setInputText}
                    />
                ),
            },
            {
                text: 'UPLOAD',
                viewState: 'upload',
                component: (
                    <UploadFileFromDevice
                        selectedFile={deviceTextFile}
                        handleChangeSelectedFile={handleChangeDeviceTextFile}
                        handleChangeFileData={handleChangeTextData}
                        fileTypeList={[TextFileType.PlainText]}
                    />
                ),
            },
            {
                text: 'BROWSE MLVT',
                viewState: 'browse',
                component: (
                    <BrowseFile
                        allowTypes={[ProjectType.Text]}
                        handleChangeSelectedProject={handleChangeMLVTText}
                        selectedProject={MLVTText}
                    />
                ),
            },
        ],
        [
            deviceTextFile,
            handleChangeTextData,
            handleChangeMLVTText,
            inputText,
            MLVTText,
        ],
    )

    const AudioViews = useMemo(
        () => [
            {
                text: 'BUILD-IN VOICE',
                viewState: 'build-in',
                component: (
                    <SingleOptionBox
                        choices={buildinVoiceList}
                        handleChangeOption={handleChangeBuildinVoice}
                        customSx={{ width: '100%' }}
                        value={buildinVoice || ''}
                    />
                ),
            },
            {
                text: 'CUSTOM VOICE',
                viewState: 'custom',
                component: (
                    <UploadFileFromDevice
                        handleChangeFileData={handleChangeAudioData}
                        selectedFile={deviceAudioFile}
                        fileTypeList={[AudioFileType.MP3]}
                        handleChangeSelectedFile={handleChangeDeviceAudioFile}
                    />
                ),
            },
        ],
        [
            buildinVoiceList,
            buildinVoice,
            deviceAudioFile,
            handleChangeBuildinVoice,
            handleChangeAudioData,
        ],
    )

    useEffect(() => {
        const isTextValid =
            (textViewState === 'enter text' && !!inputText) ||
            (textViewState === 'upload' && !!deviceTextFile) ||
            (textViewState === 'browse' && !!MLVTText)
        const isAudioValid =
            (audioViewState === 'build-in' && !!buildinVoice) ||
            (audioViewState === 'custom' && !!deviceAudioFile)

        if (!isTextValid || !isAudioValid || !textLanguage) {
            setDisableGenerate(true)
        } else {
            setDisableGenerate(false)
        }
    }, [
        textViewState,
        inputText,
        deviceTextFile,
        MLVTText,
        audioViewState,
        buildinVoice,
        deviceAudioFile,
        textLanguage,
    ])

    const handleGenerate = useCallback(() => {
        const data: VoiceGenerationData = {
            textViewState,
            audioViewState,
            deviceAudioFile,
            deviceTextFile,
            inputText,
            buildinVoice,
            textLanguage,
            MLVTText,
            textData,
            audioData,
        }
        onGenerate(data)
    }, [
        onGenerate,
        textViewState,
        audioViewState,
        deviceAudioFile,
        deviceTextFile,
        inputText,
        buildinVoice,
        textLanguage,
        MLVTText,
        textData,
        audioData,
    ])

    const activeAudioView = AudioViews.find(
        (view) => view.viewState === audioViewState,
    )
    const ActiveAudioComponent = activeAudioView?.component || null

    const activeTextView = TextViews.find(
        (view) => view.viewState === textViewState,
    )
    const ActiveTextComponent = activeTextView?.component || null

    return (
        <>
            {/* Box for user to enter text */}
            <Box
                sx={{
                    padding: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: (theme) => theme.palette.background.paper,
                    marginBottom: '10px',
                }}
            >
                <ChangeViewBox
                    Views={TextViews}
                    setViewState={handleChangeTextViewState}
                />
                {ActiveTextComponent}
            </Box>

            {/* Translation to section */}
            <Box paddingInline={1.5}>
                <Typography
                    variant="body2"
                    sx={{
                        fontFamily:
                            'Poppins, Araboto, Roboto, Arial, sans-serif',
                        fontWeight: 500,
                        marginTop: '10px',
                    }}
                >
                    Text Language
                </Typography>
                <SingleOptionBox
                    choices={[
                        TranslateLanguage.English,
                        TranslateLanguage.Vietnamese,
                        TranslateLanguage.French,
                        TranslateLanguage.Japanese,
                    ]}
                    handleChangeOption={handleChangeTextLanguage}
                    customSx={{ width: '30%' }}
                    value={TranslateLanguage.English}
                />
            </Box>

            <Typography
                variant="body2"
                sx={{
                    fontFamily: 'Poppins, Araboto, Roboto, Arial, sans-serif',
                    fontWeight: 500,
                    paddingLeft: 1.5,
                    marginTop: '20px',
                }}
            >
                Voice Generation option:
            </Typography>

            <Box
                sx={{
                    padding: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: (theme) => theme.palette.background.paper,
                    marginBottom: '10px',
                }}
            >
                <ChangeViewBox
                    Views={AudioViews}
                    setViewState={handleChangeAudioViewState}
                />
                {ActiveAudioComponent}
            </Box>
            <GenerateButton
                isDisable={disableGenerate}
                handleGenerate={handleGenerate}
            />
        </>
    )
}
