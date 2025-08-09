import { Box, Typography } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { GetPipelineCost } from 'src/api/model.api'
import ConfirmRunModal from 'src/components/ModelCostPopup'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { VideoData } from '../../../../../types/FileData'
import { VideoFileType } from '../../../../../types/FileType'
import {
    PipelineShortForm,
    Project,
    ProjectType,
    RawVideo,
} from '../../../../../types/Project'
import { S3Folder } from '../../../../../types/S3FolderStorage'
import { TranslateLanguage } from '../../../../../types/Translation'
import { checkValidGenerate } from '../../../../../utils/ProcessTriggerPopup/CheckValidGenerate'
import { uploadVideo } from '../../../../../utils/ProcessTriggerPopup/VideoService'
import { BrowseFile } from '../../BaseComponent/BrowseMLVTFile'
import ChangeViewBox from '../../BaseComponent/ChangeView'
import { CustomAudio } from '../../BaseComponent/CustomAudio'
import { GenerateButton } from '../../BaseComponent/GenerateButton'
import { SingleOptionBox } from '../../BaseComponent/SingleOptionBox'
import { UploadFileFromDevice } from '../../BaseComponent/UploadFileFromDevice'

export interface GenerateVideoData {
    viewState: 'upload' | 'url' | 'browse'
    deviceFile: File | null
    MLVTVideo: RawVideo | null
    sourceLanguage: TranslateLanguage | null
    targetLanguage: TranslateLanguage | null
    fileData: VideoData
    sampleAudioID: number | null
}

interface DialogContentProps {
    onGenerate: (data: GenerateVideoData) => void
}

interface sampleVoiceInterface {
    displayName: string
    audioID: number | null
    fileName: string | null
}

export const DialogContent: React.FC<DialogContentProps> = ({ onGenerate }) => {
    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''
    const parsedUserId = userId ? parseInt(userId) : 0
    const [viewState, setViewState] = useState<'upload' | 'url' | 'browse'>(
        'upload',
    )
    const [sourceLanguage, setSourceLanguage] = useState<TranslateLanguage>(
        TranslateLanguage.English,
    )

    const sampleVoice: sampleVoiceInterface[] = [
        {
            displayName: 'Vietnamese voice 1',
            audioID: 117,
            fileName: 'vietnamese1(117).wav',
        },
        {
            displayName: 'Vietnamese voice 2',
            audioID: 119,
            fileName: 'vietnamese2(119).wav',
        },
        { displayName: 'None', audioID: null, fileName: null },
    ]
    const [selectedVoice, setSelectedVoice] = useState<sampleVoiceInterface>({
        displayName: 'None',
        audioID: null,
        fileName: null,
    })

    const [confirmPopup, setConfirmPopup] = useState<boolean>(false)
    const [cost, setCost] = useState<number>(0)

    const [deviceFile, setDeviceFile] = useState<File | null>(null)
    const [MLVTVideo, setMLVTVideo] = useState<RawVideo | null>(null)
    const [targetLanguage, setTargetLanguage] = useState<TranslateLanguage>(
        TranslateLanguage.Vietnamese,
    )
    const [disableGenerate, setDisableGenerate] = useState<boolean>(true)

    const [fileData, setFileData] = useState<VideoData>({
        title: 'My Video Title',
        duration: 300,
        description: 'A description of the video',
        file_name: '',
        folder: S3Folder.video,
        image: 'avatar.jpg',
        user_id: parsedUserId,
    })

    const handleChangeSourceLanguage = (value: string) => {
        if (
            Object.values(TranslateLanguage).includes(
                value as TranslateLanguage,
            )
        ) {
            setSourceLanguage(value as TranslateLanguage)
        }
    }

    const handleChangeTargetLanguage = (value: string) => {
        if (
            Object.values(TranslateLanguage).includes(
                value as TranslateLanguage,
            )
        ) {
            setTargetLanguage(value as TranslateLanguage)
        }
    }

    const handleChangeSampleVoice = (value: string) => {
        const foundVoice = sampleVoice.find((v) => v.displayName === value)
        if (foundVoice) {
            setSelectedVoice(foundVoice)
        } else {
            setSelectedVoice({
                displayName: 'None',
                audioID: null,
                fileName: null,
            })
        }
    }

    const handleRemoveSampleVoice = () => {
        setSelectedVoice({ displayName: 'None', audioID: null, fileName: null })
    }

    const handleChangeFileData = useCallback((update: Partial<VideoData>) => {
        setFileData((prevData) => ({
            ...prevData,
            ...update,
        }))
    }, [])

    const handleChangeDeviceFile = (file: File | null) => {
        setDeviceFile(file)
    }

    const handleChangeMLVTVideo = useCallback(
        (input: Project | null) => {
            if (input && input.type_project !== ProjectType.Video) return
            setMLVTVideo(input as RawVideo | null)
        },
        [setMLVTVideo],
    )

    const changeViewState = (view: string) => {
        if (['upload', 'url', 'browse'].includes(view)) {
            setViewState(view as 'upload' | 'url' | 'browse')
        }
    }

    const uploadVideoFromDevice = useCallback(async (): Promise<number> => {
        if (deviceFile) {
            try {
                const videoId = await uploadVideo(deviceFile, fileData)
                return videoId
            } catch (error) {
                throw error
            }
        } else {
            throw new Error('Failed uploading Video file to Server')
        }
    }, [deviceFile, fileData])

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
                text: 'BROWSE MLVT',
                viewState: 'browse',
                handleSubmit:
                    MLVTVideo !== null
                        ? () => Promise.resolve(MLVTVideo.id)
                        : undefined,
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
            handleChangeMLVTVideo,
            MLVTVideo,
            uploadVideoFromDevice,
        ],
    )

    useEffect(() => {
        if (
            !checkValidGenerate(viewState, deviceFile, MLVTVideo) ||
            !sourceLanguage ||
            !targetLanguage
        ) {
            setDisableGenerate(true)
        } else {
            setDisableGenerate(false)
        }
    }, [viewState, deviceFile, sourceLanguage, targetLanguage, MLVTVideo])

    const activeView = Views.find((view) => view.viewState === viewState)
    const ActiveComponent = activeView?.component || null

    const handlePipelineTrigger = useCallback(async () => {
        const generationData: GenerateVideoData = {
            viewState,
            deviceFile,
            MLVTVideo,
            sourceLanguage,
            targetLanguage,
            fileData,
            sampleAudioID: selectedVoice.audioID,
        }

        // Call the function passed down from the parent
        onGenerate(generationData)
    }, [
        viewState,
        deviceFile,
        MLVTVideo,
        sourceLanguage,
        targetLanguage,
        fileData,
        onGenerate,
        selectedVoice.audioID,
    ])

    const handleYesConfirmPopup = handlePipelineTrigger
    const handleCloseConfirmPopup = () => setConfirmPopup(false)

    const handleGenerate = useCallback(async () => {
        try {
            const response = await GetPipelineCost(
                PipelineShortForm.Fullpipeline,
            )
            if (!response.model_charge_active) {
                handlePipelineTrigger()
            } else {
                setCost(response.cost)
                setConfirmPopup(true)
            }
        } catch (error) {
            console.error(error)
        }
    }, [handlePipelineTrigger])

    return (
        <>
            <Box
                sx={{
                    padding: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: (theme) => theme.palette.background.paper,
                }}
            >
                <ChangeViewBox Views={Views} setViewState={changeViewState} />
                {ActiveComponent}
            </Box>
            <Box
                marginTop="10px"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 30,
                }}
            >
                <Box flex={1}>
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500,
                            fontSize: '0.9rem',
                        }}
                    >
                        Video's language:
                    </Typography>
                    <SingleOptionBox
                        choices={[
                            TranslateLanguage.English,
                            TranslateLanguage.Vietnamese,
                        ]}
                        handleChangeOption={handleChangeSourceLanguage}
                        value={sourceLanguage}
                    />
                </Box>
                <Box flex={1}>
                    <Typography
                        sx={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500,
                            fontSize: '0.9rem',
                        }}
                    >
                        Translate to:
                    </Typography>
                    <SingleOptionBox
                        choices={[
                            TranslateLanguage.English,
                            TranslateLanguage.Vietnamese,
                        ]}
                        handleChangeOption={handleChangeTargetLanguage}
                        value={targetLanguage}
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    marginTop: '15px',
                    border: '1.5px dashed grey',
                    padding: '20px',
                    borderRadius: '10px',
                }}
            >
                <Typography mb="0.9rem" sx={{ fontSize: '0.9rem' }}>
                    {' '}
                    Choose sample voice (optional):{' '}
                </Typography>

                {selectedVoice.fileName && (
                    <CustomAudio
                        handleRemoveFile={handleRemoveSampleVoice}
                        audioURL={null}
                        localFile={selectedVoice.fileName}
                    />
                )}

                <SingleOptionBox
                    choices={sampleVoice.map((v) => v.displayName)}
                    handleChangeOption={handleChangeSampleVoice}
                    value={selectedVoice.displayName}
                    customSx={
                        selectedVoice.fileName ? { mt: '1.2rem' } : undefined
                    }
                />
            </Box>

            <GenerateButton
                isDisable={disableGenerate}
                handleGenerate={handleGenerate}
            />
            <ConfirmRunModal
                isOpen={confirmPopup}
                onNo={handleCloseConfirmPopup}
                onYes={handleYesConfirmPopup}
                model={PipelineShortForm.Fullpipeline}
                cost={cost}
            />
        </>
    )
}
