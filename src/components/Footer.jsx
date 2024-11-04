import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className="bg-white pt-10 rounded-t-[50px]">
			<div className="container ">
				<section className="flex max-md:flex-col">
					<div className="left flex-1 ">
						<h6 className="mb-4 text-blue-500 font-bold">Thymbol.com</h6>

						<div>
							<p className="mb-2">Sign up for the best deals near you!</p>
							<div className="mb-4 border border-black-500 w-fit max-sm:w-full max-sm:relative py-2 px-3 rounded-full">
								<input
									className="outline-none border-none max-sm:w-full"
									type="email"
									placeholder="Enter your email"
								/>
								<button className="bg-blue-500 text-white px-2 py-1 rounded-full max-sm:absolute max-sm:right-2 bottom-[5px]">
									→
								</button>
							</div>
						</div>

						<div>
							<p className="mb-2">Grow your business with us!</p>
							<div className="mb-4 border border-black-500 w-fit max-sm:w-full max-sm:relative py-2 px-3 rounded-full">
								<input
									className="outline-none border-none max-sm:w-full"
									type="email"
									placeholder="Enter your email"
								/>
								<button className="bg-blue-500 text-white px-2 py-1 rounded-full max-sm:absolute right-2 bottom-[5px]">
									→
								</button>
							</div>
						</div>
					</div>

					<div className="right flex-1 flex justify-between max-md:flex-col max-md:gap-4">
						<div className="flex flex-col">
							<h6 className="mb-4 text-blue-500 font-bold">Company</h6>
							<Link to={'/'}>Home</Link>
							<Link to={'/about'}>About</Link>
							<Link to={'/'}>Team</Link>
							<Link to={'/login-consumer'}>Login as Consumer</Link>
							<Link to={'/login'}>Login as Business</Link>
							<Link to={'/clipped-deals'}>Deals</Link>
							<Link to={'/'}>Categories</Link>
						</div>
						<div className="flex flex-col">
							<h6 className="mb-4 text-blue-500 font-bold">Documentation</h6>
							<Link to={'/'}>Help Center</Link>
							<Link to={'/'}>Contact</Link>
							<Link to={'/faq'}>FAQ</Link>
							<Link to={'/privacy-policy'}>Privacy Policy</Link>
						</div>
						<div className="flex flex-col">
							<h6 className="mb-4 text-blue-500 font-bold">Socials</h6>
							<Link to={'https://www.facebook.com/Thymbol'}>Facebook</Link>
							<Link
								to={'https://www.instagram.com/thymbolmorocco/profilecard/'}
							>
								Instagram
							</Link>
							<Link to={'https://www.youtube.com/@thymbol'}>Youtube</Link>
							{/* <Link to={'https://twitter.com/'}>Twitter</Link> */}
						</div>
					</div>
				</section>

				<section className="border-t border-gray-400 flex justify-between py-3 mt-4 text-xs">
					<p> ©️Thymbol.com. All Rights Reserved {new Date().getFullYear()}</p>
					<p>Terms & Conditions</p>
				</section>
			</div>
		</footer>
	);
};

export default Footer;
