import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './common/login-form';
import Social from './common/social';
import useDarkMode from '@/hooks/useDarkMode';

// image import
import LogoWhite from '@/assets/images/logo/logo-white.svg';
// import Logo from "@/assets/images/logo/logo.svg";
// import Illustration from "@/assets/images/auth/ils1.svg";
import Illustration from '@/assets/images/auth/ils1.png';
import Logo from '@/assets/images/auth/logo_login.png';
import fetchWrapper from '@/util/fetchWrapper';
import axios from 'axios';

const login = () => {
    const [isDark] = useDarkMode();
    const [htmlContent, setHtmlContent] = useState('');
    const navigate = useNavigate();

    const handleGooleLogin = async () => {
      try {
        const response = await axios.get('http://localhost:5000/google-login');
        console.log("handleGooleLogin == response:", response)
        window.location.href = "http://" + response.data.href
      } catch (error) {
        
      }
    }

    const redirect = () => {
        console.log(htmlContent);
    }
    return (
        <div className="loginwrapper">
            <div className="lg-inner-column">
                <div
                    className="left-column relative z-[1]"
                    style={{
                        backgroundImage: `url(${Illustration})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <div className="max-w-[560px] pt-20 ltr:pl-20 rtl:pr-20">
                        <Link to="/">
                            <img
                                src={isDark ? LogoWhite : Logo}
                                alt=""
                                className="mb-10"
                            />
                        </Link>
                        <h5 className="text-white text-[2rem] leading-[3rem]">
                            Your Real-Time Digital Coupon Platform!
                        </h5>
                    </div>
                    {/* <div className="absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]">
            <img
              src={Illustration}
              alt=""
              className="h-full w-full object-contain"
            />
          </div> */}
                </div>
                <div className="right-column relative">
                    <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
                        <div className="auth-box h-full flex flex-col justify-center">
                            <div className="mobile-logo text-center mb-6 lg:hidden block">
                                <Link to="/">
                                    <img
                                        src={isDark ? LogoWhite : Logo}
                                        alt=""
                                        className="mx-auto"
                                    />
                                </Link>
                            </div>
                            <div className="text-center 2xl:mb-10 mb-4">
                                <h4 className="font-medium">Welcome Back!</h4>
                                <h5 className="text-slate-500 text-base">
                                    Sign In to your account
                                </h5>
                            </div>
                            <LoginForm />
                            <div className="relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6">
                                <div className="absolute inline-block bg-white dark:bg-slate-800 dark:text-slate-400 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm text-slate-500 font-normal">
                                    Or continue with
                                </div>
                            </div>
                            <div className="mx-auto mt-8 w-full">
                                <button className="px-4 py-4 flex gap-2 justify-center items-center text-slate-950 font-medium border-slate-200 dark:border-slate-700 text-center w-full rounded-lg bg-gray-50 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 mb-5" onClick={handleGooleLogin}>
                                    <img
                                        className="w-6 h-6"
                                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                                        loading="lazy"
                                        alt="google logo"
                                    />
                                    <span>Continue with Google</span>
                                </button>

                                <button className="px-4 py-4 flex gap-2 justify-center items-center text-slate-950 font-medium border-slate-200 dark:border-slate-700 text-center w-full rounded-lg bg-gray-50 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                                    <img
                                        className="w-6 h-6"
                                        src="https://www.svgrepo.com/show/511330/apple-173.svg"
                                        loading="lazy"
                                        alt="apple logo"
                                    />
                                    <span>Continue with Apple</span>
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
