import { Box } from "@mui/material";
import { CustomAudioPlayer } from "./CustomizedVideo";
import { TextView } from "./Text";

interface AudioProps {
    type: 'audio';
    props: {
        audioSrc: string;
        audioTittle: string;
    };
}

interface TextProps {
    type: 'text';
    props: {
        displayText: string;
        textTittle: string;
    };
}

type ChildComponentProps = AudioProps | TextProps;

interface RealatedOutputProps {
    childrenData: ChildComponentProps[];
}

export const RealatedOutput: React.FC<RealatedOutputProps> = ({ childrenData }) => {
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4, mt: 4, padding: "10px", paddingTop: "0" }}>
            {childrenData.map((child, index) => {
                if (child.type === 'audio') {
                    return (
                        <CustomAudioPlayer 
                            key={index}
                            audioSrc={child.props.audioSrc} 
                            audioTittle={child.props.audioTittle} 
                        />
                    );
                }
                if (child.type === 'text') {
                    return (
                        <TextView
                            key={index}
                            displayText={child.props.displayText}
                            textTittle={child.props.textTittle}
                        />
                    );
                }
                return null; // Fallback for unsupported types
            })}
        </Box>
    );
};