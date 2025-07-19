import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { InfoNav } from "../BaseComponent/InfomationNavBar";
import { CustomAudioPlayer } from "../BaseComponent/RelatedOutput/CustomizedVideoBox";
import { deleteAudioById, getAudioById } from "../../../../api/audio.api";
import { SharePopup } from "src/components/SharePopup";

interface ContentProps {
    audioId: number;
    hideNavBar?: boolean;
}

export const RawAudioContent: React.FC<ContentProps> = ({
    audioId,
    hideNavBar = false,
}) => {
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const [isSharePopupOpen, setSharePopupOpen] = useState(false);

    const handleShare = () => {
        console.log("handleShare function was called! Setting popup to open.");
        setSharePopupOpen(true);
    };

    const handleCloseSharePopup = () => {
        setSharePopupOpen(false);
    };

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await getAudioById(audioId);
                setAudioUrl(response.download_url.split("?")[0]);
            } catch (error) {
                console.error("Error fetching video URL:", error);
            }
        };

        fetchVideoData();
    }, [audioId]);

    const handleDelete = async (id: string) => {
        console.log('Delete button is clicked with id:', id)
        try {
            await deleteAudioById(id);
            console.log('Project deleted successfully. Reloading page...');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting project:', error)
        }
    }

    return (
        <>
            {!hideNavBar && <InfoNav id={String(audioId)} projectType="Audio" onDelete={handleDelete} onShare={handleShare} />}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                    padding: "10px",
                    paddingTop: "0",
                }}
            >
                <CustomAudioPlayer
                    audioSrc={audioUrl || ""}
                    audioTitle={"Raw Audio"}
                    sourceType="audio"
                    customizeSx={{ width: "60%", height: "100%" }}
                    disableDownload={true}
                />
            </Box>

            <SharePopup
                open={isSharePopupOpen}
                onClose={handleCloseSharePopup}
                url={window.location.href} 
            />
        </>
    );
};
