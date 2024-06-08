import uploadSvgImage from '@/assets/images/svg/upload.svg';
import { useDropzone } from 'react-dropzone';

const DropZone = ({ title, onDrop, files }) => {
    const { getRootProps, getInputProps, isDragAccept } = useDropzone({
        accept: {
            'image/*': [],
        },
        onDrop: (acceptedFiles) => {
            onDrop(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

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
                            <div className="text-sm text-slate-950 dark:text-slate-300 f">
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
                        <div key={i} className="mb-4 flex-none">
                            <div className="h-[300px] w-[300px] mx-auto mt-6 rounded-md">
                                <img
                                    src={file.preview}
                                    className=" object-contain h-full w-full block rounded-md"
                                    onLoad={() => {
                                        URL.revokeObjectURL(file.preview);
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropZone;
