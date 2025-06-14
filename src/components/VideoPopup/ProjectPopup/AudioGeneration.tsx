import React, { useMemo, useState, useEffect } from "react";
import ChangeViewBox from "../ProcessTriggerPopup/BaseComponent/ChangeView";
import { InfoNav } from "./BaseComponent/InfomationNavBar/InfoNav";
import { RelatedOutput } from "./BaseComponent/RelatedOutput";
import { Box } from "@mui/material";
// import { Text } from "../../../types/Response/Text";
import { AudioGenerationProject } from "../../../types/Project";
import { getAduioById } from "../../../api/audio.api";
import { getTextContent } from "../../../utils/ProcessTriggerPopup/TextService";

interface ContentProps {
    inputProject: AudioGenerationProject;
}

export const AudioGenerationContent: React.FC<ContentProps> = ({
    inputProject,
}) => {
    const [viewState, setViewState] = useState<"original" | "related output">(
        "original"
    );
    // const [originalTextInformation, setOriginalTextInformation] =
    //     useState<Text | null>(null);
    const [originalTextContent, setOriginalTextContent] = useState<
        string | null
    >(null);
    const [resultAudio, setResultAudio] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const [resultAudio, originalText] = await Promise.all([
                    getAduioById(inputProject.generated_audioId),
                    getTextContent(inputProject.original_textId),
                ]);
                // setOriginalTextInformation(originalText[0]);
                setOriginalTextContent(originalText[1]);
                setResultAudio(resultAudio.download_url.split("?")[0]);
            } catch (error) {
                console.error("Error fetching Audio Genration URL:", error);
            }
        };

        fetchVideoData();
    }, [inputProject]);

    const changeViewState = (view: string) => {
        if (["original", "related output"].includes(view)) {
            setViewState(view as "original" | "related output");
        }
    };

    const Views = useMemo(
        () => [
            {
                text: "ORIGINAL INPUT",
                viewState: "original",
                component: (
                    <RelatedOutput
                        splitTwoColumn={false}
                        childrenData={[
                            {
                                type: "text",
                                props: {
                                    textTittle: "Input Text",
                                    displayText: originalTextContent
                                        ? originalTextContent
                                        : "",
                                },
                            },
                        ]}
                    />
                ),
            },
            {
                text: "AUDIO GENERATION OUTPUT",
                viewState: "related output",
                component: (
                    <RelatedOutput
                        splitTwoColumn={false}
                        childrenData={[
                            {
                                type: "audio/video",
                                props: {
                                    audioSrc: resultAudio ? resultAudio : "",
                                    audioTittle: "Output audio",
                                    sourceType: "audio",
                                },
                            },
                        ]}
                    />
                ),
            },
        ],
        [resultAudio, originalTextContent]
    );

    const activeView = Views.find((view) => view.viewState === viewState);
    const ActiveComponent = activeView?.component || null;

    return (
        <>
            <InfoNav />
            <Box
                sx={{
                    mt: "10px",
                    display: "flex",
                    flexDirection: "column",
                    mb: "15px",
                }}
            >
                <Box paddingX={1} sx={{ marginBottom: "20px" }}>
                    <ChangeViewBox
                        Views={Views}
                        setViewState={changeViewState}
                    />
                </Box>
                {ActiveComponent}
            </Box>
        </>
    );
};
