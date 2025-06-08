import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ChangeViewBox from "../BaseComponent/ChangeView";
import { UploadFileFromDevice } from "../BaseComponent/UploadFileFromDevice";
import { GenerateButton } from "../BaseComponent/GenerateButton";
import UploadNotification from "../../../UploadNotification";
import { BrowseFile } from "../BaseComponent/BrowseMLVTFile";
import { InputTextBox } from "../BaseComponent/InputTextBox";
import { SingleOptionBox } from "../BaseComponent/OptionBox";
import { generateVoice } from "../../../../utils/ProcessTriggerPopup/PipelineService";
import { TranslateLanguage } from "../../../../types/Translation";
import { LoadingDots } from "../../../StaticComponent/LoadingDot/LoadingDot";
import { AudioFileType, TextFileType } from "../../../../types/FileType";
import { TextData, AudioData } from "../../../../types/FileData";
import { S3Folder } from "../../../../types/S3FolderStorage";
import { uploadText } from "../../../../utils/ProcessTriggerPopup/TextService";
import { useAuth } from "../../../../context/AuthContext";
import { uploadAudio } from "../../../../utils/ProcessTriggerPopup/AudioService";
import { ProjectType, RawText, Project } from "../../../../types/Project";
import { getLanguageCode } from "../../../../utils/ProcessTriggerPopup/VideoPopup.utils";

interface UploadNoti {
    isOpen: boolean;
    status: "fail" | "success";
}

export const DialogContent: React.FC = () => {
    const buildinVoiceList = useMemo(
        () => [
            "en-US-Wavenet-A",
            "en-US-Wavenet-B",
            "en-US-Wavenet-C",
            "en-US-Wavenet-D",
            "vi-VN-Wavenet-A",
            "vi-VN-Wavenet-B",
            "fr-FR-Wavenet-A",
            "fr-FR-Wavenet-B",
            "ja-JP-Wavenet-A",
            "ja-JP-Wavenet-B",
        ],
        []
    );
    type BuildinVoice = (typeof buildinVoiceList)[number];
    const { userId } = useAuth();
    const parsedUserId = userId ? parseInt(userId) : 0;

    const [buildinVoice, setBuildinVoice] = useState<BuildinVoice | null>(null);
    const [audioViewState, setAudioViewState] = useState<"build-in" | "custom">(
        "build-in"
    );
    const [textViewState, setTextViewState] = useState<
        "upload" | "enter text" | "browse"
    >("enter text");
    const [deviceAudioFile, setDeviceAudioFile] = useState<File | null>(null);
    const [deviceTextFile, setDeviceTextFile] = useState<File | null>(null);
    const [MLVTText, setMLVTText] = useState<RawText | null>(null);
    const [inputText, setInputText] = useState<string>("");
    const [disableGenerate, setDisableGenerate] = useState<boolean>(true);
    const [textLanguage, setTextLanguage] = useState<TranslateLanguage | null>(
        null
    );

    const [uploadNoti, setUploadNoti] = useState<UploadNoti>({
        isOpen: false,
        status: "success",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [textData, setTextData] = useState<TextData>({
        file_name: "",
        folder: S3Folder.text,
        user_id: parsedUserId,
        lang: "",
    });

    const [audioData, setAudioData] = useState<AudioData>({
        file_name: "",
        folder: S3Folder.audio,
        user_id: parsedUserId,
        duration: 0,
    });

    const handleChangeTextLanguage = (value: string) => {
        if (
            Object.values(TranslateLanguage).includes(
                value as TranslateLanguage
            )
        ) {
            setTextLanguage(value as TranslateLanguage);
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

    const handleChangeTextData = useCallback((update: Partial<TextData>) => {
        setTextData((prevData) => ({
            ...prevData,
            ...update,
        }));
    }, []);

    const handleChangeAudioData = useCallback((update: Partial<AudioData>) => {
        setAudioData((prevData: AudioData) => ({
            ...prevData,
            ...update,
        }));
    }, []);

    const handleChangeMLVTText = useCallback(
        (input: Project | null) => {
            if (input && input.type_project !== ProjectType.Text) return; // Ensure it's an audio project
            setMLVTText(input as RawText | null);
        },
        [setMLVTText]
    );

    const handleChangeDeviceTextFile = (file: File | null) => {
        setDeviceTextFile(file);
    };

    const handleChangeDeviceAudioFile = (file: File | null) => {
        setDeviceAudioFile(file);
    };

    const handleCloseStatusPopup = () => {
        setUploadNoti((prevData) => ({ ...prevData, isOpen: false }));
    };

    const handleChangeAudioViewState = (view: string) => {
        if (["build-in", "custom"].includes(view)) {
            setAudioViewState(view as "build-in" | "custom");
        }
    };

    const handleChangeTextViewState = (view: string) => {
        if (["upload", "enter text", "browse"].includes(view)) {
            setTextViewState(view as "upload" | "enter text" | "browse");
        }
    };

    const uploadTextFromDevice = useCallback(async (): Promise<number> => {
        if (deviceTextFile && textLanguage) {
            try {
                handleChangeTextData({ lang: getLanguageCode(textLanguage) });
                const textId = await uploadText(
                    deviceTextFile,
                    textData,
                    TextFileType.PlainText
                );
                return textId;
            } catch (error) {
                throw error;
            }
        } else {
            throw new Error("No file provided for translation.");
        }
    }, [deviceTextFile, textData, textLanguage, handleChangeTextData]);

    const handleGenerateEnteringText =
        useCallback(async (): Promise<number> => {
            if (inputText && textLanguage) {
                try {
                    const tmpTextData: TextData = {
                        file_name:
                            userId +
                            "_" +
                            Math.floor(Date.now() / 1000) +
                            ".txt",
                        folder: S3Folder.text,
                        user_id: parsedUserId,
                        lang: getLanguageCode(textLanguage),
                    };
                    const textId = await uploadText(
                        inputText,
                        tmpTextData,
                        TextFileType.PlainText
                    );
                    return textId;
                } catch (error) {
                    throw error;
                }
            } else {
                throw new Error("No text provided for translation.");
            }
        }, [inputText, parsedUserId, userId, textLanguage]);

    const uploadAudioFromDevice = useCallback(async (): Promise<number> => {
        if (deviceAudioFile) {
            try {
                const audioId = await uploadAudio(deviceAudioFile, audioData);
                return audioId;
            } catch (error) {
                throw error;
            }
        } else {
            throw new Error("Failed uploading Audio file to Server");
        }
    }, [deviceAudioFile, audioData]);

    const TextViews = useMemo(
        () => [
            {
                text: "ENTER TEXT",
                viewState: "enter text",
                handleSubmit: handleGenerateEnteringText,
                component: (
                    <InputTextBox
                        inputTextFromParent={inputText}
                        handleChangeText={setInputText}
                    />
                ),
            },
            {
                text: "UPLOAD",
                viewState: "upload",
                handleSubmit: uploadTextFromDevice,
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
                text: "BROWSE MLVT",
                viewState: "browse",
                component: (
                    <BrowseFile
                        allowTypes={[ProjectType.Text]}
                        handleChangeSelectedProject={handleChangeMLVTText}
                        selectedProject={MLVTText}
                    />
                ),
                handleSubmit:
                    MLVTText !== null
                        ? () => Promise.resolve(MLVTText.id)
                        : undefined,
            },
        ],
        [
            deviceTextFile,
            handleChangeTextData,
            handleGenerateEnteringText,
            inputText,
            uploadTextFromDevice,
            handleChangeMLVTText,
            MLVTText,
        ]
    );

    const AudioViews = useMemo(
        () => [
            {
                text: "BUILD-IN VOICE",
                viewState: "build-in",
                component: (
                    <SingleOptionBox
                        choices={buildinVoiceList}
                        handleChangeOption={handleChangeBuildinVoice}
                        customSx={{ width: "100%" }}
                        initChoice={buildinVoice || ""}
                    />
                ),
            },
            {
                text: "CUSTOM VOICE",
                viewState: "custom",
                handleSubmit: uploadAudioFromDevice,
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
            handleChangeBuildinVoice,
            deviceAudioFile,
            handleChangeAudioData,
            uploadAudioFromDevice,
        ]
    );

    useEffect(() => {
        if (textViewState === "enter text" && !inputText) {
            setDisableGenerate(true);
        } else if (textViewState === "upload" && !deviceTextFile) {
            setDisableGenerate(true);
        } else if (textViewState === "browse" && !MLVTText) {
            setDisableGenerate(true);
        } else if (!textLanguage) {
            setDisableGenerate(true);
        } else if (audioViewState === "build-in" && !buildinVoice) {
            setDisableGenerate(true);
        } else if (audioViewState === "custom" && !deviceAudioFile) {
            setDisableGenerate(true);
        } else {
            setDisableGenerate(false);
        }
    }, [
        buildinVoice,
        textViewState,
        textLanguage,
        inputText,
        deviceTextFile,
        audioViewState,
        deviceAudioFile,
        MLVTText,
    ]);

    const activeAudioView = AudioViews.find(
        (view) => view.viewState === audioViewState
    );
    const ActiveAudioComponent = activeAudioView?.component || null;
    const handleAudioGenerate: (() => Promise<number>) | undefined =
        activeAudioView?.handleSubmit;

    const activeTextView = TextViews.find(
        (view) => view.viewState === textViewState
    );
    const ActiveTextComponent = activeTextView?.component || null;
    const handleTextGenerate: (() => Promise<number>) | undefined =
        activeTextView?.handleSubmit;

    const handleGenerate = useCallback(async () => {
        let textId: number | undefined = undefined;
        let audioId: number | undefined = undefined;
        try {
            setIsLoading(true);
            setDisableGenerate(true);
            // Ensure handleTextGenerate is defined before calling it
            const textPromise = handleTextGenerate
                ? handleTextGenerate()
                : Promise.resolve(undefined);
            const audioPromise =
                audioViewState === "custom" && handleAudioGenerate
                    ? handleAudioGenerate()
                    : Promise.resolve(undefined);

            // Run both promises in parallel
            [textId, audioId] = await Promise.all([textPromise, audioPromise]);
            if (textId) {
                generateVoice(textId);
            } else {
                throw new Error(
                    "textId or audioId is null when receiving error"
                );
            }
            setUploadNoti({ isOpen: true, status: "success" });
        } catch (error) {
            console.error("Uploading files to server failed", error);
            setUploadNoti({ isOpen: true, status: "fail" });
        } finally {
            setIsLoading(false);
            setDisableGenerate(false);
        }
    }, [audioViewState, handleAudioGenerate, handleTextGenerate]);

    return (
        <>
            {/* Box for user to enter text */}
            <Box
                sx={{
                    padding: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: (theme) => theme.palette.background.paper,
                    marginBottom: "10px",
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
                            "Poppins, Araboto, Roboto, Arial, sans-serif",
                        fontWeight: 500,
                        marginTop: "10px",
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
                    customSx={{ width: "100%" }}
                    initChoice={TranslateLanguage.English}
                />
            </Box>

            <Typography
                variant="body2"
                sx={{
                    fontFamily: "Poppins, Araboto, Roboto, Arial, sans-serif",
                    fontWeight: 500,
                    paddingLeft: 1.5,
                    marginTop: "20px",
                }}
            >
                Voice Generation option:
            </Typography>

            <Box
                sx={{
                    padding: 1.5,
                    borderRadius: 1.5,
                    backgroundColor: (theme) => theme.palette.background.paper,
                    marginBottom: "10px",
                }}
            >
                <ChangeViewBox
                    Views={AudioViews}
                    setViewState={handleChangeAudioViewState}
                />
                {ActiveAudioComponent}
            </Box>
            {isLoading && <LoadingDots content="Uploading video" />}
            <GenerateButton
                isDisable={disableGenerate}
                handleGenerate={handleGenerate}
            />
            <UploadNotification
                isOpen={uploadNoti["isOpen"]}
                uploadStatus={uploadNoti["status"]}
                onClose={handleCloseStatusPopup}
                content={null}
            />
        </>
    );
};
