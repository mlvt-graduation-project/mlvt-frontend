import React, { useCallback } from 'react'
import UploadNotification from 'src/components/UploadNotification'

import axios from 'axios'
import { useGetUserDetails } from 'src/hooks/useGetUserDetails'
import { TextFileType } from 'src/types/FileType'
import { translateText } from 'src/utils/ProcessTriggerPopup/PipelineService'
import { uploadText } from 'src/utils/ProcessTriggerPopup/TextService'
import { getLanguageCode } from 'src/utils/ProcessTriggerPopup/VideoPopup.utils'
import { BasePopup } from '../../BasePopup'
import { DialogContent, TextTranslationData } from './PopupContent'

interface NotificationState {
    isOpen: boolean
    status: 'success' | 'fail' | 'loading'
    content: string | null
}
interface VideoTranslationPopupProps {
    isOpen: boolean
    onClose: () => void
}

export const TextTranslationPopup: React.FC<VideoTranslationPopupProps> = ({
    isOpen,
    onClose,
}) => {
    const [notification, setNotification] = React.useState<NotificationState>({
        isOpen: false,
        status: 'loading',
        content: null,
    })

    const { data: userDetails } = useGetUserDetails()
    const userId = userDetails?.user.id.toString() || ''

    const handleCloseNotification = () => {
        setNotification({ ...notification, isOpen: false })
    }

    const handleStartGeneration = useCallback(
        async (data: TextTranslationData) => {
            onClose()
            setNotification({
                isOpen: true,
                status: 'loading',
                content: 'Processing request...',
            })

            try {
                let textId: number | undefined

                // Add source language to textData before uploading
                if (data.sourceLanguage) {
                    data.textData.lang = getLanguageCode(data.sourceLanguage)
                }

                // Determine the text source and get its ID
                if (data.viewState === 'upload' && data.deviceFile) {
                    setNotification((prev) => ({
                        ...prev,
                        content: 'Uploading text file...',
                    }))
                    textId = await uploadText(
                        data.deviceFile,
                        data.textData,
                        TextFileType.PlainText,
                    )
                } else if (data.viewState === 'enter text' && data.inputText) {
                    setNotification((prev) => ({
                        ...prev,
                        content: 'Uploading input text...',
                    }))
                    const textBlob = new Blob([data.inputText], {
                        type: 'text/plain',
                    })
                    const newFileName = `${userId}_${Math.floor(Date.now() / 1000)}`
                    const textFile = new File([textBlob], newFileName, {
                        type: 'text/plain',
                    })
                    data.textData.file_name = newFileName
                    textId = await uploadText(
                        textFile,
                        data.textData,
                        TextFileType.PlainText,
                    )
                } else if (data.viewState === 'browse' && data.MLVTText) {
                    textId = data.MLVTText.id
                }

                if (!textId || !data.sourceLanguage || !data.targetLanguage) {
                    throw new Error('Missing required data for translation.')
                }

                // Start the translation process
                setNotification((prev) => ({
                    ...prev,
                    content: 'Translating text...',
                }))
                await translateText(
                    textId,
                    data.sourceLanguage,
                    data.targetLanguage,
                )

                // On success
                setNotification({
                    isOpen: true,
                    status: 'success',
                    content: 'Upload data successfully! 🎉',
                })
            } catch (error) {
                console.error('Text translation process failed:', error)
                let errorMessage = 'An unknown error occurred.'

                if (axios.isAxiosError(error) && error.response?.data) {
                    const data = error.response.data as {
                        error?: string
                        error_message?: string
                        message?: string
                    }

                    errorMessage =
                        data.error ||
                        data.error_message ||
                        data.message ||
                        error.message
                } else if (error instanceof Error) {
                    errorMessage = error.message
                }
                // On failure
                setNotification({
                    isOpen: true,
                    status: 'fail',
                    content: `Text Translation failed: ${errorMessage}`,
                })
            }
        },
        [onClose, userId],
    )
    return (
        <>
            <BasePopup
                title="Text Translation"
                isOpen={isOpen}
                onClose={onClose}
                statusChip={null}
                childComponent={
                    <DialogContent onGenerate={handleStartGeneration} />
                }
            />
            <UploadNotification
                isOpen={notification.isOpen}
                status={notification.status}
                content={notification.content}
                onClose={handleCloseNotification}
            />
        </>
    )
}
