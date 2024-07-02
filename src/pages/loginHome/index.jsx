import MainHome from '@/assets/images/home/home_main.png';
import LogoWhite from '@/assets/images/logo/logo-c-white.png';
import Button from '@/components/ui/Button';

const LoginHomePage = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${MainHome})`,
                backgroundRepeat: 'no-repeat',
                height: '100%',
                backgroundSize: 'cover',
            }}
            className="min-h-screen"
        >
            <div className="h-screen flex flex-col justify-center items-center space-y-4">
                <img src={LogoWhite} alt="Thymbol Logo" />

                <Button
                    text="Login as Consumer"
                    className="btn bg-customBlue text-white w-1/3"
                    icon={'heroicons-solid:user'}
                    link={'/login-consumer'}
                />

                <Button
                    text="Login as Business"
                    className="btn bg-customBlue text-white w-1/3"
                    icon={'heroicons-solid:briefcase'}
                    link={'/login'}
                />
            </div>
        </div>
    );
};

export default LoginHomePage;
