import { useEffect, useState } from 'react'
import { getOneVideoById } from 'src/api/video.api'
import { PipelineProgress } from '../../types'
import { OriginalVideo } from 'src/features/core-feature-popup/ProjectPopup/BaseComponent/OriginalVideo'

type VideoState<T> = {
    data: T | null
    isLoading: boolean
    error: string | null
}

interface AssetState{
    lipSyncVideo: VideoState<string>
}

interface LipSynchronizationResultDisplayProps {
    progressData: PipelineProgress
}
export const LipSynchronizationResultDisplay = ({
    progressData,
}: LipSynchronizationResultDisplayProps) => {
    const [assets, setAssets] = useState<AssetState>({
        lipSyncVideo: {
            data: null,
            isLoading: true,
            error: null,
        },
    })

    useEffect(() => {
        let isMounted = true

        const fetchLipSyncVideo = async () => {
            if (isMounted) {
                setAssets({
                    lipSyncVideo: {
                        data: null,
                        isLoading: true,
                        error: null,
                    },
                })
            }

            if (!progressData.progressed_video_id) {
                if (isMounted) {
                    setAssets({
                        lipSyncVideo: {
                            data: null,
                            isLoading: false,
                            error: 'Missing lip sync video ID',
                        },
                    })
                }
                return
            }

            try {
                const videoResult = await getOneVideoById(
                    progressData.progressed_video_id,
                )

                if (isMounted) {
                    setAssets({
                        lipSyncVideo: {
                            data: videoResult.video_url,
                            isLoading: false,
                            error: null,
                        },
                    })
                }
            } catch (error) {
                if (isMounted) {
                    setAssets({
                        lipSyncVideo: {
                            data: null,
                            isLoading: false,
                            error: 'Failed to fetch lip sync video',
                        },
                    })
                }
            }
        }

        fetchLipSyncVideo()

        return () => {
            isMounted = false
        }
    }, [progressData.progressed_video_id])

    return (
        <div>
            {assets.lipSyncVideo.isLoading ? (
                <p>Loading...</p>
            ) : assets.lipSyncVideo.error ? (
                <p>Error: {assets.lipSyncVideo.error}</p>
            ) : (
                <OriginalVideo videoUrl={assets.lipSyncVideo.data}/>
            )}
        </div>
    )
}
