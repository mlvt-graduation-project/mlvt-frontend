import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ChangeViewBox from "../BaseComponent/ChangeView";
import { UploadFileFromDevice } from "../BaseComponent/UploadFileFromDevice";
import { TextData, VideoData } from "../../../../types/FileData";
import { GenerateButton } from "../BaseComponent/GenerateButton";
import UploadNotification from "../../../UploadNotification";
import { BrowseFile } from "../BaseComponent/BrowseMLVTFile";
import { InputTextBox } from "../BaseComponent/InputTextBox";
import { SingleOptionBox } from "../BaseComponent/OptionBox";
import { TranslateLanguage } from "../../../../types/Translation";
import { LoadingDots } from "../../../StaticComponent/LoadingDot/LoadingDot";
import { TextFileType } from "../../../../types/FileType";
import { uploadText } from "../../../../utils/ProcessTriggerPopup/TextService";
import { translateText } from "../../../../utils/ProcessTriggerPopup/PipelineService";
import { useAuth } from "../../../../context/AuthContext";
import { S3Folder } from "../../../../types/S3FolderStorage";
import { ProjectType, RawText, Project } from "../../../../types/Project";
import { postTextTranslation } from "../../../../api/pipeline.api";
import { getLanguageCode } from "../../../../utils/ProcessTriggerPopup/VideoPopup.utils";

interface UploadNoti {
  isOpen: boolean;
  status: "fail" | "success";
}

export const DialogContent: React.FC = () => {
  const [viewState, setViewState] = useState<
    "upload" | "enter text" | "browse"
  >("enter text");
  const [deviceFile, setDeviceFile] = useState<File | null>(null);
  const [MLVTText, setMLVTText] = useState<RawText | null>(null);
  const [inputText, setInputText] = useState<string>("");
  const [disableGenerate, setDisableGenerate] = useState<boolean>(true);
  const [sourceLanguage, setSourceLanguage] =
    useState<TranslateLanguage | null>(null);
  const [targetLanguage, setTargetLanguage] =
    useState<TranslateLanguage | null>(null);
  const { userId } = useAuth();
  const parsedUserId = userId ? parseInt(userId) : 0;

  const [uploadNoti, setUploadNoti] = useState<UploadNoti>({
    isOpen: false,
    status: "success",
  });
  const [transcriptNoti, setTranscriptNoti] = useState<UploadNoti>({
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

  const handleChangeTextData = useCallback((update: Partial<TextData>) => {
    setTextData((prevData) => ({
      ...prevData,
      ...update,
    }));
  }, []);

  const handleChangeDeviceFile = (file: File | null) => {
    setDeviceFile(file);
  };

  const handleChangeMLVTText = useCallback(
    (input: Project | null) => {
      if (input && input.type_project !== ProjectType.Text) return; // Ensure it's an audio project
      setMLVTText(input as RawText | null);
    },
    [setMLVTText]
  );

  const handleGenerateFileFromDevice =
    useCallback(async (): Promise<number> => {
      if (deviceFile && sourceLanguage) {
        try {
          handleChangeTextData({ lang: getLanguageCode(sourceLanguage) });
          const textId = await uploadText(
            deviceFile,
            textData,
            TextFileType.PlainText
          );
          return textId;
        } catch (error) {
          throw error;
        }
      } else {
        throw new Error("No device file to post");
      }
    }, [deviceFile, textData, sourceLanguage, handleChangeTextData]);

  const handleGenerateEnteringText = useCallback(async (): Promise<number> => {
    if (inputText && sourceLanguage) {
      try {
        const tmpTextData: TextData = {
          file_name: userId + "_" + Math.floor(Date.now() / 1000),
          folder: S3Folder.text,
          user_id: parsedUserId,
          lang: getLanguageCode(sourceLanguage),
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
      throw new Error("No input text to upload");
    }
  }, [inputText, parsedUserId, userId, sourceLanguage]);

  const handleCloseStatusPopup = () => {
    setUploadNoti((prevData) => ({ ...prevData, isOpen: false }));
  };

  const changeViewState = (view: string) => {
    if (["upload", "enter text", "browse"].includes(view)) {
      setViewState(view as "upload" | "enter text" | "browse");
    }
  };

  const Views = useMemo(
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
        handleSubmit: handleGenerateFileFromDevice,
        component: (
          <UploadFileFromDevice
            selectedFile={deviceFile}
            handleChangeSelectedFile={handleChangeDeviceFile}
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
          MLVTText !== null ? () => Promise.resolve(MLVTText.id) : undefined,
      },
    ],
    [
      deviceFile,
      handleChangeTextData,
      handleGenerateFileFromDevice,
      handleGenerateEnteringText,
      inputText,
      handleChangeMLVTText,
      MLVTText,
    ]
  );

  useEffect(() => {
    if (viewState === "enter text" && !inputText) {
      setDisableGenerate(true);
    } else if (viewState === "upload" && !deviceFile) {
      setDisableGenerate(true);
    } else if (viewState === "browse" && !MLVTText) {
      setDisableGenerate(true);
    } else if (!sourceLanguage) {
      setDisableGenerate(true);
    } else if (!targetLanguage) {
      setDisableGenerate(true);
    } else {
      setDisableGenerate(false);
    }
  }, [
    sourceLanguage,
    targetLanguage,
    inputText,
    viewState,
    deviceFile,
    MLVTText,
  ]);

  const activeView = Views.find((view) => view.viewState === viewState);
  const ActiveComponent = activeView?.component || null;
  const handleViewGenerate: (() => Promise<number>) | undefined =
    activeView?.handleSubmit;

  const handleGenerate = useCallback(async () => {
    let textId: number | undefined = undefined;
    try {
      setIsLoading(true);
      setDisableGenerate(true);

      const textPromise = handleViewGenerate
        ? handleViewGenerate()
        : Promise.resolve(undefined);

      // Run both promises in parallel
      textId = await textPromise;
      setUploadNoti({ isOpen: true, status: "success" });
      try {
        if (textId && sourceLanguage && targetLanguage) {
          translateText(textId, sourceLanguage, targetLanguage);
        } else
          throw new Error("TextId or textLanguage or targetLanguage is null");
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
  }, [handleViewGenerate, sourceLanguage, targetLanguage]);

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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Choosing audio language seciton */}
        <Box paddingX={2}>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: "0.9rem",
            }}
          >
            Text language:
          </Typography>
          <SingleOptionBox
            choices={[
              TranslateLanguage.English,
              TranslateLanguage.Vietnamese,
              TranslateLanguage.French,
              TranslateLanguage.Japanese,
            ]}
            customSx={{}}
            handleChangeOption={handleChangeSourceLanguage}
            initChoice={TranslateLanguage.English}
          />
        </Box>
        {/* choosing model section */}
        <Box>
          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
              fontSize: "0.9rem",
            }}
          >
            Translate to Language:
          </Typography>
          <SingleOptionBox
            choices={[
              TranslateLanguage.English,
              TranslateLanguage.Vietnamese,
              TranslateLanguage.French,
              TranslateLanguage.Japanese,
            ]}
            handleChangeOption={handleChangeTargetLanguage}
            initChoice={TranslateLanguage.Vietnamese}
          />
        </Box>
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
