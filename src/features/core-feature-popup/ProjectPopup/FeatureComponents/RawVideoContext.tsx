import React, { useEffect, useState } from 'react'
import { NavInfo } from 'src/types/Project'
import { deleteVideoById, getOneVideoById } from '../../../../api/video.api'
import { InfoNav } from '../BaseComponent/InfomationNavBar'
import { OriginalVideo } from '../BaseComponent/OriginalVideo'
import { SharePopup } from "src/components/SharePopup";

interface ContentProps {
    videoId: number
    hideNavBar?: boolean
}

export const RawVideoContent: React.FC<ContentProps> = ({
    videoId,
    hideNavBar = false,
}) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null)
    const [navInfo, setNavInfo] = useState<NavInfo>({
        created_at: 'none-detected',
        language: 'none-detected',
    })

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
                const response = await getOneVideoById(videoId)
                setVideoUrl(response.video_url.split('?')[0])
                setNavInfo({
                    created_at: new Date(response.video.created_at),
                    language: 'None-detected',
                })
            } catch (error) {
                console.error('Error fetching video URL:', error)
            }
        }

        fetchVideoData()
    }, [videoId])

    const handleDelete = async (id: string) => {
        console.log('Delete button is clicked with id:', id)
        try {
            await deleteVideoById(id);
            console.log('Project deleted successfully. Reloading page...');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting project:', error)
        }
    }

    return (
        <>
            {!hideNavBar && <InfoNav id={String(videoId)} projectType="Video" onDelete={handleDelete} onShare={handleShare} />}
            <OriginalVideo videoUrl={videoUrl}></OriginalVideo>

            <SharePopup
                open={isSharePopupOpen}
                onClose={handleCloseSharePopup}
                url={window.location.href} 
            />
        </>
    )
}
