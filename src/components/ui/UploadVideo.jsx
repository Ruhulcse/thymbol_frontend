import { selectCurrentUser } from '@/store/api/auth/authSlice';
import { usePostReviewVideoMutation } from '@/store/api/uploadReviewVideo/uploadReviewVideoApiSlice';
import { swalError, swalSuccess } from '@/util/helpers';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const UploadVideo = ({ store_id }) => {
    const userId = useSelector(selectCurrentUser);
    const [uploadVideo, { isLoading }] = usePostReviewVideoMutation();
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('video', file);
            formData.append('store', store_id);
            formData.append('creator', userId);

            try {
                await uploadVideo(formData).unwrap();
                swalSuccess('Video uploaded successfully!');
            } catch (error) {
                swalError('Error uploading video:', error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    return (
        <div className="mx-4">
            <label
                htmlFor="file-upload"
                className={`text-[14px] bg-customBlue p-3 inline-flex items-center cursor-pointer rounded-md ${
                    isUploading ? 'opacity-50' : ''
                }`}
            >
                <Icon
                    icon="heroicons:cloud-arrow-up"
                    className="pr-1 text-2xl text-white"
                />
                <span className="text-white">
                    {isUploading ? 'Uploading...' : 'Upload a video'}
                </span>
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileChange}
                    disabled={isUploading}
                />
            </label>
            {isUploading && (
                <p className="mt-2 text-sm text-gray-500">
                    Uploading, please wait...
                </p>
            )}
        </div>
    );
};

export default UploadVideo;
