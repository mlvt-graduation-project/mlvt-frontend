import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ChangeViewBox from "../BaseComponent/ChangeView";
import { UploadFileFromDevice } from "../BaseComponent/UploadFileFromDevice";
import { UploadVideoFromUrl } from "../BaseComponent/UploadVideoURL";
import { VideoData } from "../../../../types/FileData";
import { checkValidUrl } from "../../../../utils/ProjectPopup/CheckValidUrl";
import { GenerateButton } from "../BaseComponent/GenerateButton";
import UploadNotification from "../../../UploadNotification";
import { BrowseFile } from "../BaseComponent/BrowseMLVTFile";
import { generateText } from "../../../../utils/ProcessTriggerPopup/PipelineService";
import { uploadVideo } from "../../../../utils/ProcessTriggerPopup/VideoService";
import { LoadingDots } from "../../../StaticComponent/LoadingDot/LoadingDot";
import { SingleOptionBox } from "../BaseComponent/OptionBox";
import { VideoFileType } from "../../../../types/FileType";
import { S3Folder } from "../../../../types/S3FolderStorage";
import { ProjectType, RawVideo, Project } from "../../../../types/Project";
import { checkValidGenerate } from "../../../../utils/ProcessTriggerPopup/CheckValidGenerate";
import { TranslateLanguage } from "../../../../types/Translation";

interface UploadNoti {
  isOpen: boolean;
  status: "fail" | "success";
}

export const DialogContent: React.FC = () => {
  const [viewState, setViewState] = useState<"upload" | "url" | "browse">(
    "upload"
  );
  const [deviceFile, setDeviceFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [MLVTVideo, setMLVTVideo] = useState<RawVideo | null>(null);
  const [disableGenerate, setDisableGenerate] = useState<boolean>(true);
  const [sourceLanguage, setSourceLanguage] =
    useState<TranslateLanguage | null>(null);

  const [uploadNoti, setUploadNoti] = useState<UploadNoti>({
    isOpen: false,
    status: "success",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fileData, setFileData] = useState<VideoData>({
    title: "My Video Title",
    duration: 300,
    description: "A description of the video",
    file_name: "",
    folder: S3Folder.video,
    image: "avatar.jpg",
    user_id: parseInt(localStorage.getItem("userId") || "0"),
  });

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

  const handleChangeSourceLanguage = (value: string) => {
    if (Object.values(TranslateLanguage).includes(value as TranslateLanguage)) {
      setSourceLanguage(value as TranslateLanguage);
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
      throw new Error("Failed uploading Video file to Server");
    }
  }, [deviceFile, fileData]);

  const handleCloseStatusPopup = () => {
    setUploadNoti((prevData) => ({ ...prevData, isOpen: false }));
  };

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
        text: "URL",
        viewState: "url",
        component: (
          <UploadVideoFromUrl
            handleChangeDisableGenerate={handleChangeDisableGenerate}
            setURLInput={setVideoUrl}
          />
        ),
      },
      {
        text: "BROWSE MLVT",
        viewState: "browse",
        handleSubmit:
          MLVTVideo !== null ? () => Promise.resolve(MLVTVideo.id) : undefined,
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
    if (
      !checkValidGenerate(viewState, deviceFile, videoUrl, MLVTVideo) ||
      !sourceLanguage
    ) {
      setDisableGenerate(true);
    } else {
      setDisableGenerate(false);
    }
  }, [viewState, deviceFile, videoUrl, MLVTVideo, sourceLanguage]);

  const activeView = Views.find((view) => view.viewState === viewState);
  const ActiveComponent = activeView?.component || null;
  const handleViewGenerate: (() => Promise<number>) | undefined =
    activeView?.handleSubmit;

  const handleGenerate = useCallback(async () => {
    let videoId: number | undefined = undefined;
    try {
      setIsLoading(true);
      setDisableGenerate(true);

      const videoPromise = handleViewGenerate
        ? handleViewGenerate()
        : Promise.resolve(undefined);

      // Run both promises in parallel
      videoId = await videoPromise;
      setUploadNoti({ isOpen: true, status: "success" });
      try {
        if (videoId && sourceLanguage) {
          generateText(videoId, sourceLanguage);
        }
      } catch (error) {
        console.error("Error handling Text Generation process");
      }
    } catch (error) {
      console.error("Uploading files to server failed", error);
      setUploadNoti({ isOpen: true, status: "fail" });
    } finally {
      setIsLoading(false);
      setDisableGenerate(false);
    }
  }, [handleViewGenerate, sourceLanguage]);
  return (
    <>
      <Box
        sx={{
          padding: 1.5,
          borderRadius: 1.5,
          backgroundColor: "#EBEBEB",
        }}
      >
        <ChangeViewBox Views={Views} setViewState={changeViewState} />
        {ActiveComponent}
      </Box>
      <Box sx={{ marginTop: "15px", paddingLeft: "10px" }}>
        <Typography
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontSize: "0.9rem",
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
          initChoice={TranslateLanguage.English}
        />
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
