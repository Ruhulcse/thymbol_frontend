import React, { useState } from 'react';
import uploadSvgImage from '@/assets/images/svg/upload.svg';
import { useDropzone } from 'react-dropzone';

const DropZone = ({ title, onDrop, files }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const { getRootProps, getInputProps, isDragAccept } = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop: (acceptedFiles) => {
            const mappedFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
            
            if (selectedIndex !== null) {
                // Replace the selected file
                const newFiles = [...files];
                newFiles[selectedIndex] = mappedFiles[0];
                onDrop(newFiles);
                setSelectedIndex(null);
            } else {
                onDrop([...files, ...mappedFiles]);
            }
        },
    });

    const handleRemove = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        onDrop(newFiles);
    };

    const handleReplace = (index) => {
        setSelectedIndex(index);
    };

    return (
        <div>
            <div className="w-full text-center border-dashed border-2 border-customBlue rounded-md py-[52px] flex flex-col justify-center items-center bg-white">
                {files.length === 0 && (
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input className="hidden" {...getInputProps()} />
                        <img
                            src={uploadSvgImage}
                            alt=""
                            className="mx-auto mb-4"
                        />
                        {isDragAccept ? (
                            <div className="text-sm text-slate-500 dark:text-slate-300 ">
                                {title}
                            </div>
                        ) : (
                            <div className="text-sm text-slate-950 dark:text-slate-300">
                                <div className="font-semibold">{title}</div>
                                <span className='text-gray-500'>Drag & Drop or{' '}</span>
                                <span className="text-customBlue font-normal cursor-pointer">
                                    Browse
                                </span>
                            </div>
                        )}
                    </div>
                )}
                <div className="flex space-x-4">
                    {files.map((file, i) => (
                        <div key={i} className="mb-4 flex-none relative group">
                            <div className="h-[300px] w-[300px] mx-auto mt-6 rounded-md">
                                <img
                                    src={file.preview}
                                    className="object-contain h-full w-full block rounded-md"
                                    onLoad={() => {
                                        URL.revokeObjectURL(file.preview);
                                    }}
                                />
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleRemove(i)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropZone;
