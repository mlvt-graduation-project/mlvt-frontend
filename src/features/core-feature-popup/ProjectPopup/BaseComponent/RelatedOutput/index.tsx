import { Box } from "@mui/material";
import { CustomAudioPlayer } from "./CustomizedVideoBox";
import { TextView } from "./CustomizedTextBox";

interface AudioProps {
    type: "audio/video";
    props: {
        audioSrc: string;
        audioTitle: string;
        sourceType: "audio" | "video";
    };
}

interface TextProps {
    type: "text";
    props: {
        displayText: string;
        textTitle: string;
    };
}

type ChildComponentProps = AudioProps | TextProps;

interface RelatedOutputProps {
    childrenData: ChildComponentProps[];
    splitTwoColumn: boolean;
}

export const RelatedOutput: React.FC<RelatedOutputProps> = ({
    childrenData,
    splitTwoColumn,
}) => {
    // const defaultSx = {};

    const splitTwoColumnSx = splitTwoColumn
        ? {
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              padding: "5px",
              gap: 2,
              height: "40px",
              mt: 2,
              paddingTop: "0",
          }
        : {
              width: "100%",
          };

    const customChildSx = splitTwoColumn
        ? {
              height: "100%",
          }
        : {
              width: "80%",
              height: "100%",
          };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                ...splitTwoColumnSx,
            }}
        >
            {childrenData.map((child, index) => {
                if (child.type === "audio/video") {
                    return (
                        <CustomAudioPlayer
                            key={index}
                            audioSrc={child.props.audioSrc}
                            audioTitle={child.props.audioTitle}
                            customizeSx={customChildSx}
                            sourceType={child.props.sourceType}
                        />
                    );
                }
                if (child.type === "text") {
                    return (
                        <TextView
                            key={index}
                            displayText={child.props.displayText}
                            textTitle={child.props.textTitle}
                            customizeSx={customChildSx}
                            centerTitle={true}
                        />
                    );
                }
                return null;
            })}
        </Box>
    );
};
