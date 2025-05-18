import { Box, Button, Typography } from '@mui/material';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from 'react';
import { BrowseMLVTPopup } from './BrowseMLVTPopup';
import { ProjectType, Project } from '../../../../types/Project';
import { TextView } from '../../ProjectPopup/BaseComponent/RelatedOutput/CustomizedTextBox';
import { getTextDownloadUrl } from '../../../../api/text.api';
import { getTextFileContent } from '../../../../api/aws.api';
import { getAudioDownloadURL } from '../../../../api/audio.api';
// import AudioPlayer from 'material-ui-audio-player';
import { getVideoDownloadUrl } from '../../../../api/video.api';
import { CustomAudio } from './CustomAudio';
import { CustomVideo } from './CustomVideo';
import { CustomText } from './CustomText';

interface BrowsFileProps {
    selectedProject: Project | null;
    handleChangeSelectedProject: (selectedProject: Project | null) => void;
    allowTypes?: ProjectType[];
}

export const BrowseFile: React.FC<BrowsFileProps> = ({ allowTypes, handleChangeSelectedProject, selectedProject }) => {
    const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);
    const [projectContent, setProjectContent] = useState<React.ReactNode | null>(null);
    const handleClosePopup = () => {
        setIsPopUpOpen(false);
    };

    useEffect(() => {
        const fetchProjectContent = async () => {
            if (!selectedProject) {
                setProjectContent(null);
                return;
            }

            try {
                switch (selectedProject.type_project) {
                    case ProjectType.Text: {
                        const textURL = await getTextDownloadUrl(selectedProject.id);
                        const textContent = await getTextFileContent(textURL);
                        setProjectContent(
                            <CustomText
                                textContent={textContent}
                                handleRemoveFile={() => handleChangeSelectedProject(null)}
                            />
                        );
                        break;
                    }
                    case ProjectType.Audio: {
                        const audioURL = await getAudioDownloadURL(selectedProject.id);
                        setProjectContent(
                            <CustomAudio
                                audioURL={audioURL}
                                handleRemoveFile={() => handleChangeSelectedProject(null)}
                            />
                        );
                        break;
                    }
                    case ProjectType.Video: {
                        const videoURL = await getVideoDownloadUrl(selectedProject.id);
                        setProjectContent(
                            <CustomVideo
                                videoURL={videoURL}
                                handleRemoveFile={() => handleChangeSelectedProject(null)}
                                customSx={{ margin: '0px' }}
                            />
                        );
                        break;
                    }
                    default:
                        setProjectContent(null);
                }
            } catch (error) {
                console.error('Error loading project content:', error);
                setProjectContent(null);
            }
        };

        fetchProjectContent();
    }, [selectedProject, handleChangeSelectedProject]);
    return (
        <>
            <Typography
                variant="body2"
                sx={{ marginTop: '5px', marginBottom: '10px' }}
                fontFamily={'Inter,Araboto, Roboto, Arial, sans-seri'}
            >
                Browse your existed file on our MLVT
            </Typography>
            {selectedProject === null ? (
                <Box
                    sx={{
                        border: '2px dashed grey',
                        padding: '10px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        minHeight: '150px',
                        maxHeight: '300px',
                        height: '20vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    onClick={() => setIsPopUpOpen(true)}
                >
                    <FileOpenIcon sx={{ fontSize: '3rem' }} />
                    <Typography
                        variant="body2"
                        sx={{ marginTop: '5px' }}
                        fontFamily={'Inter,Araboto, Roboto, Arial, sans-seri'}
                    >
                        {/* {selectedFile ? selectedFile?.name : "Browse your MLVT storage to find materials"} */}
                        Browse your MLVT storage to find materials
                    </Typography>
                    <Button
                        startIcon={<InfoOutlinedIcon />}
                        variant="text"
                        disabled
                        sx={{
                            marginTop: '2rem',
                            fontSize: '0.8rem',
                            padding: 0,
                            fontFamily: 'Inter, Araboto, Roboto, Arial, sans-serif',
                            fontWeight: 'bold',
                            '&.Mui-disabled': { color: 'black' },
                        }}
                    >
                        Required
                    </Button>
                </Box>
            ) : (
                // <Box
                //     sx={{
                //         border: '2px dashed grey',
                //         padding: '10px',
                //         justifyContent: 'center',
                //         borderRadius: '8px',
                //         cursor: 'pointer',
                //         width: '100%', // Ensures it takes full width of its container
                //         display: 'block', // Allows height to expand based on content
                //     }}
                // >
                // { projectContent }
                // </Box>
                projectContent
            )}

            <BrowseMLVTPopup
                isOpen={isPopUpOpen}
                onClose={handleClosePopup}
                allowType={allowTypes}
                handleChangeSelectedProject={handleChangeSelectedProject}
            />
        </>
    );
};
