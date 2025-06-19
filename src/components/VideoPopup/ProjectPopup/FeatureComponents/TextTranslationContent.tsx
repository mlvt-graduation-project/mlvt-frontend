import React, { useMemo, useState, useEffect } from "react";
import ChangeViewBox from "../../ProcessTriggerPopup/BaseComponent/ChangeView";
import { InfoNav } from "../BaseComponent/InfomationNavBar";
import { RelatedOutput } from "../BaseComponent/RelatedOutput";
import { Box } from "@mui/material";
import { TextTranslationProject } from "../../../../types/Project";
import { getTextContent } from "../../../../utils/ProcessTriggerPopup/TextService";
import { Text } from "../../../../types/Response/Text";

interface ContentProps {
    inputProject: TextTranslationProject;
}

export const TextTranslationContent: React.FC<ContentProps> = ({
    inputProject,
}) => {
    const [viewState, setViewState] = useState<"original" | "related output">(
        "original"
    );
    const [, setOriginalTextInformation] = useState<Text | null>(null);
    const [originalTextContent, setOriginalTextContent] = useState<
        string | null
    >(null);
    const [, setResultTextInformation] = useState<Text | null>(null);
    const [resultTextContent, setResultTextContent] = useState<string | null>(
        null
    );

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const [originalText, resultText] = await Promise.all([
                    getTextContent(inputProject.original_textId),
                    getTextContent(inputProject.translated_textId),
                ]);
                setOriginalTextContent(originalText[1]);
                setOriginalTextInformation(originalText[0]);
                setResultTextContent(resultText[1]);
                setResultTextInformation(resultText[0]);
            } catch (error) {
                console.error("Error fetching video URL:", error);
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
                                    textTitle: "Input Text",
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
                text: "RELATED OUTPUT",
                viewState: "related output",
                component: (
                    <RelatedOutput
                        splitTwoColumn={false}
                        childrenData={[
                            {
                                type: "text",
                                props: {
                                    textTitle: "Input Text",
                                    displayText: resultTextContent
                                        ? resultTextContent
                                        : "",
                                },
                            },
                        ]}
                    />
                ),
            },
        ],
        [originalTextContent, resultTextContent]
    );

    const activeView = Views.find((view) => view.viewState === viewState);
    const ActiveComponent = activeView?.component || null;

    return (
        <>
            <InfoNav />
            <Box sx={{ marginTop: "15px" }}>
                <ChangeViewBox Views={Views} setViewState={changeViewState} />
                <Box sx={{ marginTop: "30px" }}>{ActiveComponent}</Box>
            </Box>
        </>
    );
};
