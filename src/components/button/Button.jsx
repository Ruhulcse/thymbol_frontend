import { Icon } from '@iconify/react';

function Button({ children, icon = '', className = 'px-6 my-3', onClick }) {
    return (
        <div
            onClick={onClick}
            className={`bg-customBlue cursor-pointer rounded-md text-white flex items-center ${className}`}
        >
            <div className="my-auto flex items-center ">
                <Icon icon={`heroicons:${icon}`} className={`pr-1 text-2xl`} />
            </div>
            <div>{children}</div>
        </div>
    );

}

export default Button;
