import React, { useMemo, useState, useEffect } from "react";
import ChangeViewBox from "../../ProcessTriggerPopup/BaseComponent/ChangeView";
import { getOneVideoById } from "../../../../api/video.api";
import { InfoNav } from "../BaseComponent/InfomationNavBar";
import { OriginalVideo } from "../BaseComponent/OriginalVideo";
import { RelatedOutput } from "../BaseComponent/RelatedOutput";
import { MainProjectOutput } from "../BaseComponent/MainProjectOutput";
import { FullPipelineProject } from "../../../../types/Project";
import { getTextContent } from "../../../../utils/ProcessTriggerPopup/TextService";
import { getAudioById } from "../../../../api/audio.api";
import { Box } from "@mui/material";

interface ContentProps {
    inputProject: FullPipelineProject;
}

export const FullPipelineContent: React.FC<ContentProps> = ({
    inputProject,
}) => {
    const [viewState, setViewState] = useState<
        "original" | "translated video" | "related output"
    >("original");
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [videoStatus, setVideoStatus] = useState<string | null>(null);
    const [extractedText, setExtractedText] = useState<string | null>(null);
    const [translatedText, setTranslatedText] = useState<string | null>(null);
    const [translatedAudio, setTranslatedAudio] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const [
                    videoResponse,
                    extractedTextData,
                    translatedTextData,
                    audioResponse,
                ] = await Promise.all([
                    getOneVideoById(inputProject.generated_videoId),
                    getTextContent(inputProject.extracted_textId),
                    getTextContent(inputProject.translated_textId),
                    getAudioById(inputProject.translated_audioId),
                ]);

                setVideoUrl(videoResponse.video_url.split("?")[0]);
                setImageUrl(videoResponse.image_url.split("?")[0]);
                setVideoStatus(videoResponse.video.status);
                setExtractedText(extractedTextData[1]);
                setTranslatedText(translatedTextData[1]);
                setTranslatedAudio(audioResponse.download_url.split("?")[0]);
            } catch (error) {
                console.error("Error fetching video data:", error);
            }
        };

        fetchVideoData();
    }, [inputProject]);

    const changeViewState = (view: string) => {
        if (["original", "translated video", "related output"].includes(view)) {
            setViewState(
                view as "original" | "translated video" | "related output"
            );
        }
    };

    const Views = useMemo(
        () => [
            {
                text: "ORIGINAL VIDEO",
                viewState: "original",
                component: <OriginalVideo videoUrl={videoUrl} />,
            },
            {
                text: "TRANSLATED VIDEO",
                viewState: "translated video",
                component: (
                    <MainProjectOutput
                        imageUrl={imageUrl}
                        videoUrl={videoUrl}
                        status={videoStatus || "incomplete"}
                    />
                ),
            },
            {
                text: "RELATED OUTPUT",
                viewState: "related output",
                component: (
                    <RelatedOutput
                        splitTwoColumn={true}
                        childrenData={[
                            {
                                type: "audio/video",
                                props: {
                                    audioSrc: videoUrl ? videoUrl : "",
                                    audioTitle: "Original Audio",
                                    sourceType: "audio",
                                },
                            },
                            {
                                type: "text",
                                props: {
                                    textTitle: "Original Text",
                                    displayText: extractedText
                                        ? extractedText
                                        : "",
                                },
                            },
                            {
                                type: "audio/video",
                                props: {
                                    audioSrc: translatedAudio
                                        ? translatedAudio
                                        : "",
                                    audioTitle: "Processed Audio",
                                    sourceType: "audio",
                                },
                            },
                            {
                                type: "text",
                                props: {
                                    textTitle: "Processed Text",
                                    displayText: translatedText
                                        ? translatedText
                                        : "",
                                },
                            },
                        ]}
                    />
                ),
            },
        ],
        [
            imageUrl,
            videoUrl,
            extractedText,
            translatedAudio,
            translatedText,
            videoStatus,
        ]
    );

    const activeView = Views.find((view) => view.viewState === viewState);
    const ActiveComponent = activeView?.component || null;

    return (
        <Box
            sx={{
                overflowY: "auto",
                minHeight: "35rem",
            }}
        >
            <InfoNav />
            <Box
                sx={{
                    mt: "10px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Box paddingX={1}>
                    <ChangeViewBox
                        Views={Views}
                        setViewState={changeViewState}
                    />
                </Box>
                {ActiveComponent}
            </Box>
        </Box>
    );
};
