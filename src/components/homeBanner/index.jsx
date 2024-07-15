import { Link } from 'react-router-dom';

const HomeBanner = () => {
    return (
        <Link to="/consumer-payment">
            <div className="bg-customBlue text-white py-8 md:py-11 text-xl sm:text-2xl md:text-4xl lg:text-6xl text-center ">
                <div className="blinking-text">GET EXCLUSIVE ACCESS NOW!</div>
            </div>
        </Link>
    );
};

export default HomeBanner;
