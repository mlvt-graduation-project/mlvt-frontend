import { Box } from '@mui/material';
import { CustomAudioPlayer } from './CustomizedVideoBox';
import { TextView } from './CustomizedTextBox';

interface AudioProps {
    type: 'audio/video';
    props: {
        audioSrc: string;
        audioTittle: string;
        sourceType: 'audio' | 'video';
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
    splitTwoColumn: boolean;
}

export const RealatedOutput: React.FC<RealatedOutputProps> = ({ childrenData, splitTwoColumn }) => {
    // const defaultSx = {};

    const splitTwoColumnSx = splitTwoColumn
        ? {
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              padding: '0px',
          }
        : {};

    const customChildSx = splitTwoColumn
        ? {}
        : {
              width: '50%',
              height: '100%',
          };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
                mt: 4,
                padding: '10px',
                paddingTop: '0',
                ...splitTwoColumnSx,
            }}
        >
            {childrenData.map((child, index) => {
                if (child.type === 'audio/video') {
                    return (
                        <CustomAudioPlayer
                            key={index}
                            audioSrc={child.props.audioSrc}
                            audioTittle={child.props.audioTittle}
                            customizeSx={customChildSx}
                            sourceType={child.props.sourceType}
                        />
                    );
                }
                if (child.type === 'text') {
                    return (
                        <TextView
                            key={index}
                            displayText={child.props.displayText}
                            textTittle={child.props.textTittle}
                            customizeSx={customChildSx}
                        />
                    );
                }
                return null;
            })}
        </Box>
    );
};
