import React from 'react';
import { OriginalVideo } from '../OriginalVideo/OriginalVideo';
import { ImageInProgress } from './ImageInProgress';

interface MainProjectOutputProps {
    status: string;
    videoUrl: string | null;
    imageUrl: string | null;
}

export const MainProjectOutput: React.FC<MainProjectOutputProps> = ({
    status,
    videoUrl,
    imageUrl,
}) => {
    return (
        <>
            {videoUrl !== null && status === 'complete' && (
                <OriginalVideo videoUrl={videoUrl} />
            )}
            {imageUrl !== null && status !== 'complete' && (
                <ImageInProgress imageUrl={imageUrl} progress={25} />
            )}
        </>
    );
};
