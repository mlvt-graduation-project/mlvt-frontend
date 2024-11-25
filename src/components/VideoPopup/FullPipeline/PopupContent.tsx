import React, { useMemo, useState, useCallback } from "react";
import {
    Box,
  } from "@mui/material";
import ChangeViewBox from "../BaseComponent/ChangView"
import { UploadVideoFromDevice } from "../BaseComponent/UploadFileFromDevice";
import { UploadVideoFromUrl  } from "../BaseComponent/UploadVideoURL";
import { FileData } from "../../../types/FileData";
import { GenerateButton } from "../BaseComponent/GenerateButton";
import UploadNotification from "../../UploadNotification";
import { BrowseFile } from "../BaseComponent/BrowseMLVTFile";
import { LoadingDots } from "../../StaticComponent/LoadingDot/LoadingDot";

interface UploadNoti {
    isOpen: boolean,
    status: "fail" | "success"
}

export const DialogContent: React.FC = () => {
    const [viewState, setViewState] = useState<"upload" | "url" | "browse">("upload");
    const [deviceFile, setDeviceFile] = useState<File | null> (null);
    const [videoUrl, setVideoUrl] = useState<string | null> (null);
    const [disableGenerate, setDisableGenerate] = useState<boolean> (true);
    const [getURLOnGenerate, setFunGetURLOnGenerate] = useState<(() => void) | null>(null);
    const [uploadNoti, setUploadNoti] = useState<UploadNoti> ({
        "isOpen": false,
        "status": "success"
    })
    const [transcriptNoti, setTranscriptNoti] = useState<UploadNoti> ({
        "isOpen": false,
        "status": "success"
    })
    const [isLoading, setIsLoading] = useState(false);
    const [isValidURL, setIsValidURL] = useState<boolean>(true);
    const [fileData, setFileData] = useState<FileData>({
        title: "My Video Title",
        duration: 300,
        description: "A description of the video",
        file_name: "",
        folder: "raw_videos",
        image: "avatar.jpg",
        user_id: parseInt(localStorage.getItem('userId') || '0')
    })


    const handleChangeDisableGenerate = useCallback((value: boolean) => {
        setDisableGenerate(value); 
    }, [])

    const handleChangeFileData = useCallback((update: Partial<FileData>) => {
        setFileData((prevData) => ({
            ...prevData,
            ...update,
        }));
    },[]);

    const handleChangeDeviceFile = (file: File | null) => {
        setDeviceFile(file)
    }

    const handleChangeGetURLOnGenerate = (func: () => void) => {
        setFunGetURLOnGenerate(func)
    }

    const handleCloseStatusPopup = () => {
        setUploadNoti((prevData) => ({...prevData, "isOpen": false}))
    }
  
    const handleCloseTranscriptionPopup = () => {
        setTranscriptNoti((prevData) => ({...prevData, "isOpen": false}))
    }

    const changeViewState = (view: string) => {
        if (["upload", "url", "browse"].includes(view)) {
            setViewState(view as "upload" | "url" | "browse");
        }
    };
  
    const Views = useMemo(
        () => [
            {
                text: "UPLOAD",
                viewState: "upload",
                handleSubmit: () => console.log("Click upload file"),
                component: (
                <UploadVideoFromDevice
                    selectedFile={deviceFile}
                    handleChangeSelectedFile={handleChangeDeviceFile}
                    handleChangeFileData={handleChangeFileData}
                    handleChangeDisableGenerate={handleChangeDisableGenerate}
                />
                ),
            },
            {
                text: "URL",
                viewState: "url",
                handleSubmit: () => console.log("click submit url"),
                component: (
                <UploadVideoFromUrl
                    handleChangeDisableGenerate={handleChangeDisableGenerate}
                    setURLInput={setVideoUrl}
                    setHandleChangeURL={handleChangeGetURLOnGenerate}
                    isValidURL={isValidURL}
                />
                ),
            },
            {
                text: "BROWSE MLVT",
                viewState: "browse",
                handleSubmit: () => console.log("Browse MLVT clicked"),
                component: <BrowseFile />,
            },
        ],
        [deviceFile, handleChangeFileData, handleChangeDisableGenerate, isValidURL]
      );

      const activeView = Views.find((view) => view.viewState === viewState);
      const ActiveComponent = activeView?.component || null;
      const handleGenerate = activeView?.handleSubmit || (() => Promise.resolve());

    return (
        <>
            <Box sx={{ padding: 1.5, borderRadius: 1.5, backgroundColor: "#EBEBEB" }}>
                <ChangeViewBox Views={Views} setViewState={changeViewState} />
                {ActiveComponent}
            </Box>
            {isLoading && <LoadingDots content="Uploading video" />}
            <GenerateButton isDisable={disableGenerate} handleGenerate={handleGenerate} />
            <UploadNotification
                isOpen={uploadNoti["isOpen"]}
                uploadStatus={uploadNoti["status"]}
                onClose={handleCloseStatusPopup}
                content={null}
            />
            <UploadNotification
                isOpen={transcriptNoti["isOpen"]}
                uploadStatus={transcriptNoti["status"]}
                onClose={handleCloseTranscriptionPopup}
                content={"TRANCRIPT"}
            />
        </>
    );
};
