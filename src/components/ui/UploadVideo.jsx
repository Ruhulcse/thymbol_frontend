import { Icon } from '@iconify/react';

const UploadVideo = () => {
    return (
        <label
            htmlFor="file-upload"
            className="text-[14px] bg-customBlue mx-4 p-3 inline-flex items-center cursor-pointer rounded-md"
        >
            <Icon
                icon="heroicons:cloud-arrow-up"
                className={`pr-1 text-2xl text-white`}
            />
            {/* Icon with width, height, and margin-right */}
            <span className="text-white">Upload a video</span>
            <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="video/*"
            />
        </label>
    );
};

export default UploadVideo;
