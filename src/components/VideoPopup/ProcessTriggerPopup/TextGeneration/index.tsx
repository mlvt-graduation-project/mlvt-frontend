import React, { useCallback } from "react";
import { DialogContent, TextGenerationData } from "./PopupContent";
import { BasePopup } from "../../BasePopup/BasePopup";
import UploadNotification from "../../../UploadNotification";
import { uploadVideo } from "../../../../utils/ProcessTriggerPopup/VideoService";
import { generateText } from "../../../../utils/ProcessTriggerPopup/PipelineService";

interface NotificationState {
    isOpen: boolean;
    status: "success" | "fail" | "loading";
    content: string | null;
}
interface TextGenerationPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export const TextGenerationPopup: React.FC<TextGenerationPopupProps> = ({
    isOpen,
    onClose,
}) => {
    const [notification, setNotification] = React.useState<NotificationState>({
        isOpen: false,
        status: "loading",
        content: null,
    });

    const handleCloseNotification = () => {
        setNotification({ ...notification, isOpen: false });
    };

    const handleStartGeneration = useCallback(
        async (data: TextGenerationData) => {
            onClose();
            setNotification({
                isOpen: true,
                status: "loading",
                content: "Uploading files...",
            });

            try {
                // Logic to get videoId
                let videoId: number | undefined;
                if (data.viewState === "upload" && data.deviceFile) {
                    videoId = await uploadVideo(data.deviceFile, data.fileData);
                } else if (data.viewState === "browse" && data.MLVTVideo) {
                    videoId = data.MLVTVideo.id;
                } else if (data.viewState === "url") {
                    throw new Error("URL upload not implemented yet.");
                }

                if (!videoId || !data.sourceLanguage) {
                    throw new Error(
                        "Missing required data for text generation."
                    );
                }
                await generateText(videoId, data.sourceLanguage);

                setNotification({
                    isOpen: true,
                    status: "success",
                    content: "Upload data successfully! 🎉",
                });
            } catch (error) {
                console.error("Text generation process failed:", error);
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : "An unknown error occurred.";
                setNotification({
                    isOpen: true,
                    status: "fail",
                    content: `Process failed: ${errorMessage}`,
                });
            }
        },
        [onClose]
    );
    return (
        <>
            <BasePopup
                tittle="Text Generation"
                isOpen={isOpen}
                onClose={onClose}
                statusChip={null}
                childComponent={<DialogContent onGenerate={handleStartGeneration}/>}
            />
            <UploadNotification
                isOpen={notification.isOpen}
                status={notification.status}
                content={notification.content}
                onClose={handleCloseNotification}
                title="Text Generation Status"
            />
        </>
    );
};
