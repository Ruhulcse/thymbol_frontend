import useDarkMode from '@/hooks/useDarkMode';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './common/login-form';

// image import
import LogoWhite from '@/assets/images/logo/logo-white.svg';
// import Logo from "@/assets/images/logo/logo.svg";
// import Illustration from "@/assets/images/auth/ils1.svg";
import Illustration from '@/assets/images/auth/ils1.png';
import Logo from '@/assets/images/auth/logo_login.png';
import { t } from 'i18next';

const login = () => {
    const [isDark] = useDarkMode();
    const [htmlContent, setHtmlContent] = useState('');
    const navigate = useNavigate();

    const handleGooleLogin = async () => {
        try {
            window.location.href = `${import.meta.env.VITE_API_APP_URL}/google`;
        } catch (error) {}
    };

    return (
        <div className="loginwrapper">
            <div className="lg-inner-column">
                <div className="left-column relative z-[1]">
                    <div
                        style={{
                            backgroundImage: `url(${Illustration})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        className="absolute left-0  h-full w-full z-[-1]"
                    ></div>
                    <div className="max-w-full h-full flex flex-col mt-32 items-center pt-20 ltr:px-16 rtl:px-16">
                        <Link to="/">
                            <img
                                src={isDark ? LogoWhite : Logo}
                                alt=""
                                className="mb-10 w-80"
                            />
                        </Link>
                        <h5 className="text-white text-[1.8rem] leading-[3rem]">
                            {t('Your Real-Time Digital Coupon Platform!')}
                        </h5>
                        <h6 className="text-white text-[1.8rem] leading-[3rem] mt-24">
                            Business Login
                        </h6>
                    </div>
                </div>
                <div className="right-column relative">
                    <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
                        <div className="auth-box h-full flex flex-col justify-center">
                            <div className="mobile-logo text-center mb-6 lg:hidden block">
                                <Link to="/">
                                    <img
                                        src={isDark ? LogoWhite : Logo}
                                        alt=""
                                        className="mx-auto w-48"
                                    />
                                </Link>
                            </div>
                            <div className="text-center 2xl:mb-10 mb-4">
                                <h4 className="font-medium">
                                    {t('Welcome Back!')}
                                </h4>
                                <h5 className="text-slate-500 text-base">
                                    {t('Sign In to your account')}
                                </h5>
                            </div>
                            <LoginForm />
                            <div className="relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6">
                                <div className="absolute inline-block bg-white dark:bg-slate-800 dark:text-slate-400 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm text-slate-500 font-normal">
                                    {t('Or continue with')}
                                </div>
                            </div>
                            <div className="mx-auto mt-8 w-full">
                                <button
                                    className="px-4 py-4 flex gap-2 justify-center items-center text-slate-950 font-medium border-slate-200 dark:border-slate-700 text-center w-full rounded-lg bg-gray-50 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 mb-5"
                                    onClick={handleGooleLogin}
                                >
                                    <img
                                        className="w-6 h-6"
                                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                                        loading="lazy"
                                        alt="google logo"
                                    />
                                    <span>{t('Continue with Google')}</span>
                                </button>

                                <button className="px-4 py-4 flex gap-2 justify-center items-center text-slate-950 font-medium border-slate-200 dark:border-slate-700 text-center w-full rounded-lg bg-gray-50 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                                    <img
                                        className="w-6 h-6"
                                        src="https://www.svgrepo.com/show/511330/apple-173.svg"
                                        loading="lazy"
                                        alt="apple logo"
                                    />
                                    <span>{t('Continue with Apple')}</span>
                                </button>
                            </div>

                            {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} onClick={redirect}/> */}
                            <div className="md:max-w-[345px] mx-auto font-medium text-slate-900 dark:text-slate-400 mt-12 uppercase text-sm">
                                Don’t have an account?{' '}
                                <Link
                                    to="/signup"
                                    className="text-customBlue dark:text-white font-medium hover:underline"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default login;
