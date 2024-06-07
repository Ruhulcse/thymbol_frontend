import { Link } from "react-router-dom";

const PageHeaderLinks = ({ title, link, buttonText }) => {
    return (
        <>
            <div className="flex justify-between items-center mb-10">
                <h5 className="font-bold">{title}</h5>
                <Link to={`/${link}`}>
                    <button className="btn btn-primary flex items-center">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 mr-2"
                                width={'20px'}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                        </div>
                        <div className="font-normal">{buttonText}</div>
                    </button>
                </Link>
            </div>
        </>
    );
};

export default PageHeaderLinks;
