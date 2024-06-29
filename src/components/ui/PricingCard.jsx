import useSkin from '@/hooks/useSkin';

const PricingCard = ({
    children,
    paymentMethod,
    title,
    subtitle,
    headerslot,
    className = 'custom-class',
    bodyClass = 'p-6',
    noborder,
    titleClass = 'custom-class ',
    headerClass,
    paymentAmount,
    saveCost,
    onClick,
}) => {
    const [skin] = useSkin();

    return (
        <div
            className={`
        card rounded-[20px] relative w-[400px] h-[785px] bg-white dark:bg-slate-800   ${
            skin === 'bordered'
                ? ' border border-slate-200 dark:border-slate-700'
                : 'shadow-base'
        }
   
    ${className}
        `}
        >
            {(title || subtitle) && (
                <header
                    className={`card-header ${
                        noborder ? 'no-border' : ''
                    } ${headerClass} rounded-t-[20px]`}
                >
                    <div className="h-[150px] w-full relative ">
                        {title && (
                            <div
                                className={`card-title  ${titleClass} flex justify-center`}
                            >
                                {title}
                            </div>
                        )}
                        {subtitle && (
                            <div className="card-subtitle">{subtitle}</div>
                        )}
                        <div className="bg-[#0C9AD6] h-36 w-36 rounded-full absolute  bottom-[-50%] flex   left-1/2 transform -translate-x-1/2  ring-4 ring-white">
                            <div className="flex h-36 w-36 justify-center  items-center text-white">
                                <div className="text-center">
                                    {saveCost && (
                                        <div className="text-base font-mono ">
                                            {saveCost}
                                        </div>
                                    )}
                                    {paymentMethod && (
                                        <div className="font-bold text-5xl">
                                            {paymentMethod}
                                        </div>
                                    )}
                                    {paymentAmount && (
                                        <div className="font-medium text-sm">
                                            {paymentAmount}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {headerslot && (
                        <div className="card-header-slot">{headerslot}</div>
                    )}
                </header>
            )}

            <main className={`card-body mt-16 ${bodyClass}`}>{children}</main>
            <div className="absolute bottom-8 text-center w-full px-8 rounded-lg">
                <button
                    onClick={onClick}
                    className="bg-[#0C9AD6] w-full rounded-lg text-white h-12"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default PricingCard;
