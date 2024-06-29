import videoIcon from '@/assets/images/icon/video_icon.svg';
import { useState } from 'react';
import Button from '../button/Button';
import Card from '../ui/Card';
import RecordVideo from '../ui/RecordVideo';
import UploadVideo from '../ui/UploadVideo';
export const VideoReview = () => {
    const [showVideoCapture, setShowVideoCapture] = useState(false);
    return showVideoCapture ? (
        <div className="w-1/3 mx-auto pt-16 md:pt-36">
            <RecordVideo />
        </div>
    ) : (
        <div className="w-1/3 mx-auto pt-16 md:pt-36">
            <Card className="text-center rounded-none">
                <div>
                    <div className="flex items-center justify-center">
                        <img src={videoIcon} alt="" />
                    </div>
                    <h5 className="font-bold text-base md:text-2xl mt-5">
                        Add Video Review
                    </h5>
                    <div className="text-black-500 my-5">
                        Please upload or record your video review.
                    </div>
                </div>

                <div className="flex justify-around p-4">
                    <div>
                        

                        <UploadVideo />
                    </div>
                    <div>
                        <Button
                            icon="video-camera"
                            className="text-[14px] bg-customBlue mx-4 p-3"
                            onClick={() => setShowVideoCapture(true)}
                        >
                            Record a video
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};
