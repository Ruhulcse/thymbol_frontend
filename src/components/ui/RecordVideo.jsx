import { selectCurrentUser } from '@/store/api/auth/authSlice';
import { usePostReviewVideoMutation } from '@/store/api/uploadReviewVideo/uploadReviewVideoApiSlice';
import { swalError, swalSuccess } from '@/util/helpers';
import { Icon } from '@iconify/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Webcam from 'react-webcam';

const RecordVideo = ({ setShowVideoCapture }) => {
    const userId = useSelector(selectCurrentUser);
    const { id: store_id } = useParams();
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

    const [postReviewVideo, { isLoading }] = usePostReviewVideoMutation();

    const handleStartCaptureClick = React.useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: 'video/webm',
        });
        mediaRecorderRef.current.addEventListener(
            'dataavailable',
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = React.useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStopCaptureClick = React.useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    const handleDownload = React.useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: 'video/webm',
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            a.href = url;
            a.download = 'react-webcam-stream-capture.webm';
            a.click();
            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    const handleUpload = React.useCallback(async () => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: 'video/webm',
            });

            const formData = new FormData();
            formData.append('video', blob, `review-video-${Date.now()}.webm`);
            formData.append('store', store_id);
            formData.append('creator', userId);

            try {
                await postReviewVideo(formData).unwrap();
                swalSuccess('Video uploaded successfully');
            } catch (error) {
                swalError('Failed to upload video:', error);
            } finally {
                setRecordedChunks([]);
                setShowVideoCapture(false);
            }
        }
    }, [recordedChunks, postReviewVideo]);

    return (
        <>
            <Webcam audio={false} ref={webcamRef} />
            {capturing ? (
                <button
                    className="text-[14px] text-white my-10 text-center bg-customBlue mx-4 p-3 block mx-auto cursor-pointer rounded-md justify-center"
                    onClick={handleStopCaptureClick}
                >
                    Stop Capture
                </button>
            ) : (
                <button
                    className="text-[14px] text-white my-10 text-center bg-customBlue  p-3 block mx-auto cursor-pointer rounded-md justify-center w-full"
                    onClick={handleStartCaptureClick}
                >
                    Start Capture
                </button>
            )}
            {recordedChunks.length > 0 && (
                <button
                    className="text-[14px] my-10 text-center  p-3  justify-center bg-customBlue cursor-pointer rounded-md text-white flex items-center w-full"
                    onClick={handleUpload}
                >
                    <div className="my-auto flex items-center ">
                        <Icon
                            icon={`heroicons:cloud-arrow-up`}
                            className={`pr-1 text-2xl`}
                        />
                    </div>
                    Upload Video
                </button>
            )}
        </>
    );
};

export default RecordVideo;
