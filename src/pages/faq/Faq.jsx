import { useState } from 'react';

const Faq = () => {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleAccordion = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const faqItems = [
		{
			question: 'What is Thymbol?',
			answer:
				'Thymbol is a digital coupon app that allows local business owners to create digital discounts on https://thymbol.com for their products or services to entice new customers to visit their store.',
		},
		{
			question:
				'How do I create an account and start advertising my discounts?',
			answer:
				'Here is the tutorial on how to get started: https://youtu.be/FK3ay2yThrk?si=Ebh5rHeS9xKmluIx',
		},
		{
			question: 'What happens after I create my page and consumer deals?',
			answer:
				'Your page will be created in real-time on https://thymbol.com, and your coupons will be published immediately. Our graphics team will use your promotion and logo in one of our paid ads within the next 72 hours.',
		},
		{
			question: 'What are some coupon or discount suggestions?',
			answer:
				'50% OFF the entire order - Buy One Get One Free – 25% OFF when you spend 100 dirhams these discounts make consumers take immediate notice of your product or service.',
		},
		{
			question: 'What if I want to change my coupon?',
			answer:
				'Simply log in to your Thymbol account, navigate to the left menu, and click on “Vouchers.” Then click on the pencil to make any changes to your coupon.',
		},
		{
			question:
				'How do I know when to apply a discount to my sale of product/service?',
			answer:
				'When customers visit your business, they must show you the coupon inside the Thymbol app. The coupon will have a barcode and a coupon code that you can enter in your POS machine.',
		},
		{
			question: 'What if I have multiple locations?',
			answer:
				'When you create an account, you will have an option to create and manage multiple locations.',
		},
		{
			question: 'How do I pay for my account?',
			answer:
				'When you navigate to our business portal, you will have an option to use your credit card or the convenient PayPal option.',
		},
		{
			question: 'What if I need help setting up my account?',
			answer:
				'Please feel free to send us a message on WhatsApp, and one of our account managers will assist you in setting up your account.',
		},
		{
			question: 'What are the differences in the packages?',
			answer: 'Direct them to the pricing page.',
		},
		{
			question: 'Where will my coupons be shown?',
			answer:
				'If you have created an account, your coupons will be shown on the Thymbol website and in Google, Facebook, Instagram, and TikTok ads.',
		},
		{
			question: 'Can I cancel at any time?',
			answer:
				'Yes, you can delete your account to remove your coupons at any time.',
		},
		{
			question: 'How can I get a refund?',
			answer:
				'Unfortunately, we do not refund. We have made our pricing very owner-friendly. Marketing and advertising take time to get results. Our team will begin putting in time and effort to get you results from the moment you sign up as our customer.',
		},
	];

	return (
		<section className="py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-16">
					<h2 className="text-3xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem]">
						Frequently Asked Questions
					</h2>
				</div>
				<div className="accordion-group space-y-8">
					{faqItems.map((item, index) => (
						<div
							key={index}
							className={`accordion border border-solid border-gray-300 p-4 rounded-xl transition duration-500 ${
								openIndex === index ? 'bg-indigo-50 border-indigo-600' : ''
							}`}
						>
							<button
								onClick={() => toggleAccordion(index)}
								className="accordion-toggle group inline-flex items-center justify-between text-left text-lg font-normal leading-8 text-gray-900 w-full transition duration-500 hover:text-indigo-600"
								aria-expanded={openIndex === index}
							>
								<h5 className="text-lg">{item.question}</h5>
								<svg
									className={`w-6 h-6 text-gray-900 transition-transform duration-500 ${
										openIndex === index ? 'rotate-45' : ''
									}`}
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
								>
									<path
										d="M6 12H18M12 18V6"
										stroke="currentColor"
										strokeWidth="1.6"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
							<div
								className={`accordion-content overflow-hidden transition-max-height duration-500 ${
									openIndex === index ? 'max-h-screen' : 'max-h-0'
								}`}
							>
								<p className="text-base text-gray-900 font-normal leading-6 mt-4">
									{item.answer}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Faq;
