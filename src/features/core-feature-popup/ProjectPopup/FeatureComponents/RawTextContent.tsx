import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { InfoNav } from '../BaseComponent/InfomationNavBar'
import { TextView } from '../BaseComponent/RelatedOutput/CustomizedTextBox'
// import { Text } from '../../../types/Response/Text';
import { NavInfo } from 'src/types/Project'
import { getLanguageFromCode } from 'src/utils/ProcessTriggerPopup/VideoPopup.utils'
import { getTextContent } from '../../../../utils/ProcessTriggerPopup/TextService'
import { SharePopup } from "src/components/SharePopup";
import { RawText } from "src/types/Project";
import { deleteTextById } from "src/api/text.api";

interface ContentProps {
    textId: number
    hideNavBar?: boolean
    customSx?: object
    centerTitle?: boolean
    hideDownloadButton?: boolean
}

export const RawTextContent: React.FC<ContentProps> = ({
    textId,
    hideNavBar = false,
    centerTitle = false,
    customSx,
    hideDownloadButton = false,
}) => {
    const [textContent, setTextContent] = useState<string>(
        'Some text will be display here',
    )
    const [navInfo, setNavInfo] = useState<NavInfo>({
        created_at: 'none-detected',
        language: 'none-detected',
    })
    // const [textInfomation, setTextInfomation] = useState<Text | null>(null);

    const [isSharePopupOpen, setSharePopupOpen] = useState(false);
    
    const handleShare = () => {
        console.log("handleShare function was called! Setting popup to open.");
        setSharePopupOpen(true);
    };

    const handleCloseSharePopup = () => {
        setSharePopupOpen(false);
    };

    useEffect(() => {
        const fetchTextData = async () => {
            try {
                const [textInfo, content] = await getTextContent(textId)
                // setTextInfomation(information);
                setTextContent(content)
                setNavInfo({
                    created_at: new Date(textInfo.created_at),
                    language: getLanguageFromCode(textInfo.lang),
                })
            } catch (error) {
                console.error('Error fetching video URL:', error)
            }
        }

        fetchTextData()
    }, [textId])

    const handleDelete = async (id: string) => {
        console.log('Delete button is clicked with id:', id)
        try {
            await deleteTextById(id);
            console.log('Project deleted successfully. Reloading page...');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting project:', error)
        }
    }

    return (
        <>
            {!hideNavBar && <InfoNav id={String(textId)} projectType="Text" onDelete={handleDelete} onShare={handleShare} />}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '90%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '20px',
                    padding: '10px',
                    paddingTop: '0',
                }}
            >
                <TextView
                    displayText={textContent}
                    textTitle="Text"
                    customizeSx={customSx}
                    centerTitle={centerTitle}
                    disableDownload={hideDownloadButton}
                />
            </Box>

            <SharePopup
                open={isSharePopupOpen}
                onClose={handleCloseSharePopup}
                url={window.location.href} 
            />
        </>
    )
}
