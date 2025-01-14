import React, { useState, useEffect } from 'react';
import { getOneVideoById } from '../../../api/video.api';
import { InfoNav } from './BaseComponent/InfomationNavBar/InfoNav';
import { Box } from '@mui/material';
import { TextView } from './BaseComponent/RelatedOutput/CustomizedTextBox';
import { getTranscriptionById, getTranscriptionDownloadUrl } from '../../../api/transcription.api';
import { getTextFileContent } from '../../../api/aws.api';
import { Transcription } from '../../../types/Response/Transcription';

interface ContentProps {
    textId: number;
    hideNavBar?: boolean;
    customSx?: object;
    centerTittle?: boolean;
}

export const RawTextContent: React.FC<ContentProps> = ({
    textId,
    hideNavBar = false,
    centerTittle = false,
    customSx,
}) => {
    const [textContent, setTextContent] = useState<string>('Some text will be display here');
    const [textInfomation, setTextInfomation] = useState<Transcription | null>(null);

    useEffect(() => {
        const fetchTextData = async () => {
            try {
                const getTranscription = await getTranscriptionById(textId);
                const text = await getTextFileContent(getTranscription.download_url);
                setTextInfomation(getTranscription.transcription);
                setTextContent(text);
            } catch (error) {
                console.error('Error fetching video URL:', error);
            }
        };

        fetchTextData();
    }, [textId]);

    return (
        <>
            {!hideNavBar && <InfoNav />}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '90%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    paddingTop: '0',
                }}
            >
                <TextView
                    displayText={textContent}
                    textTittle="Raw Text"
                    customizeSx={customSx}
                    centerTittle={centerTittle}
                />
            </Box>
        </>
    );
};
