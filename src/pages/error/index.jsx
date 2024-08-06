const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <section className="py-26 md:py-48 min-h-screen md:min-h-0 bg-[#f1f5f9]">
            <div className="container px-4 mx-auto">
                <div className="max-w-xl mx-auto text-center">
                    <p className="text-xl font-extrabold leading-7 mb-6">
                        Something went wrong! {error}
                    </p>
                    <div className="flex flex-wrap items-center justify-center">
                        <a
                            className="inline-block w-full md:w-auto py-4 px-6 mb-4 md:mb-0 md:mr-6 text-center leading-6 text-lg text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200"
                            href="/home"
                        >
                            Go back to Homepage
                        </a>
                        <button
                            className="inline-block w-full md:w-auto py-4 px-6 mb-4 md:mb-0 md:mr-6 text-center leading-6 text-lg text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200"
                            onClick={resetErrorBoundary}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ErrorFallback;
