import React from 'react';
import { Link } from 'react-router-dom';
import useDarkMode from '@/hooks/useDarkMode';
import RegForm from './common/reg-from';
import Social from './common/social';
// image import
import LogoWhite from '@/assets/images/logo/logo-white.svg';
import Logo from '@/assets/images/auth/logo_login.png';
// import Illustration from '@/assets/images/auth/ils1.svg';
import Illustration from '@/assets/images/auth/login-consumer.png';
import RegConsumerForm from './common/reg-consumer-form';

const RegisterConsumer = () => {
    const [isDark] = useDarkMode();
    return (
        <div className="loginwrapper">
            <div className="lg-inner-column">
                <div
                    className="left-column relative z-[1]"
                    style={{
                        backgroundImage: `url(${Illustration})`,
                            backgroundSize: 'cover',
                            backgroundPosition: '90% 100%',
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
                                className="mb-5"
                            />
                        </Link>
                        <h5 className="text-white text-[2rem] leading-[3rem]">
                            The World of Deals!
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
                <div className="right-column relative bg-white dark:bg-slate-800">
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
                            <div className="text-center 2xl:mb-10 mb-5">
                                <h4 className="font-medium">Sign up</h4>
                                <div className="text-slate-500 dark:text-slate-400 text-base">
                                    Create an account to start using THYMBOL
                                </div>
                            </div>
                            <RegConsumerForm />
                            <div className=" relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6">
                                <div className=" absolute inline-block  bg-white dark:bg-slate-800 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm  text-slate-500  dark:text-slate-400font-normal ">
                                    Or continue with
                                </div>
                            </div>
                            <div className="mx-auto mt-8 w-full">
                                <button className="px-4 py-4 flex gap-2 justify-center items-center text-slate-950 font-medium border-slate-200 dark:border-slate-700 text-center w-full rounded-lg bg-gray-50 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 mb-5">
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
                            <div className="max-w-[260px] mx-auto font-medium text-slate-900 dark:text-slate-400 2xl:mt-12 mt-6 text-sm">
                                Already have an account?
                                <Link
                                    to="/login-consumer"
                                    className="text-customBlue dark:text-white font-medium hover:underline"
                                >
                                    {' '}
                                    Sign In
                                </Link>
                            </div>
                        </div>
                        <div className="auth-footer text-center">
                            Copyright 2021, THYMBOL All Rights Reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterConsumer;