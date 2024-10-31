import useDarkMode from '@/hooks/useDarkMode';
import { Link } from 'react-router-dom';
import RegForm from './common/reg-from';
// image import
import Logo from '@/assets/images/auth/logo_login.png';
import LogoWhite from '@/assets/images/logo/logo-white.svg';
// import Illustration from '@/assets/images/auth/ils1.svg';
import Illustration from '@/assets/images/auth/ils1.png';
import { t } from 'i18next';

const register = () => {
	const [isDark] = useDarkMode();
	return (
		<div className="loginwrapper">
			<div className="lg-inner-column">
				<div
					className="left-column relative z-[1]"
					// style={{
					//     backgroundImage: `url(${Illustration})`,
					//     backgroundSize: 'cover',
					//     backgroundRepeat: 'no-repeat',
					//     display: 'flex',
					//     alignItems: 'center',
					// }}
				>
					<div
						style={{
							backgroundImage: `url(${Illustration})`,
							backgroundSize: 'cover',
							// backgroundPosition: '90% 100%',
							backgroundRepeat: 'no-repeat',
							display: 'flex',
							alignItems: 'center',
						}}
						className="absolute left-0  h-full w-full z-[-1]"
					></div>
					<div className="max-w-full h-full flex flex-col mt-32 items-center pt-24 ltr:px-16 rtl:px-16">
						<Link to="/">
							<img
								src={isDark ? LogoWhite : Logo}
								alt=""
								className="mb-10 w-80"
							/>
						</Link>
						<h5 className="text-white text-[2rem] leading-[3rem]">
							{t('Your Real-Time Digital Coupon Platform!')}
						</h5>
						<h6 className="text-white text-[1.8rem] leading-[3rem] mt-24">
							Business Portal
						</h6>
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
										className="mx-auto w-48"
									/>
								</Link>
							</div>
							<div className="text-center 2xl:mb-10 mb-5">
								<h4 className="font-medium">{t('Sign up')}</h4>
								<div className="text-slate-500 dark:text-slate-400 text-base">
									{t('Create an account to start using')} THYMBOL
								</div>
							</div>
							<RegForm />

							<div className="max-w-[260px] mx-auto font-medium text-slate-900 dark:text-slate-400 2xl:mt-2 mt-2 text-sm">
								{t('Already have an account?')}
								<Link
									to="/login"
									className="text-customBlue dark:text-white font-medium hover:underline"
								>
									{' '}
									{t('Sign In')}
								</Link>
							</div>
							<div className=" relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6">
								<div className=" absolute inline-block  bg-white dark:bg-slate-800 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm  text-slate-500  dark:text-slate-400font-normal ">
									{t('Or continue with')}
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
						</div>
						<div className="auth-footer text-center">
							{t('Copyright')} 2024 THYMBOL {t('All Rights Reserved')}.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default register;
