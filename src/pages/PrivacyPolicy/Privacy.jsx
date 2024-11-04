const policySections = [
	{
		title: '',
		content:
			'Thank you for trusting Thymbol with your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our platform. We are committed to protecting your privacy and ensuring that your personal data is handled securely and responsibly.',
	},
	{
		title: '1. Information We Collect',
		content:
			'We collect various types of information to provide and improve our services. This includes:',
		listItems: [
			'Personal Information: Information such as your name, email address, and phone number, which you provide when you register or engage with our services.',
			'Usage Information: Data on how you use our platform, including pages visited, actions taken, and time spent on the platform.',
			'Device Information: Details about the device you use to access Thymbol, including IP address, browser type, and device settings.',
		],
	},
	{
		title: '2. How We Use Your Information',
		content: 'Thymbol uses your information to:',
		listItems: [
			'Provide and improve our services',
			'Customize user experience and personalize offers',
			'Communicate with you about promotions, updates, and relevant information',
			'Protect our users and platform from fraud, misuse, or illegal activities',
		],
	},
	{
		title: '3. Sharing Your Information',
		content: 'We may share your information with:',
		listItems: [
			'Service Providers: Third-party companies that assist us in operating the platform, such as payment processors and analytics providers, under strict confidentiality agreements.',
			'Business Partners: Businesses on our platform, to allow them to offer you personalized deals and promotions (with your consent).',
			'Legal Requirements: If required by law, to comply with legal obligations or protect our rights.',
		],
	},
	{
		title: '4. Data Security',
		content:
			'We employ various security measures to protect your personal information. Despite our efforts, no system is entirely secure. We encourage you to use strong passwords and take other measures to protect your data.',
	},
	{
		title: '5. Your Rights and Choices',
		content:
			'Depending on your location, you may have rights regarding your personal information, such as accessing, updating, or deleting your data. To exercise these rights, please contact us.',
	},
	{
		title: '6. Changes to Our Privacy Policy',
		content:
			'We may update our Privacy Policy to reflect changes in our practices or legal requirements. Any updates will be posted on this page with an updated effective date.',
	},
	{
		title: '7. Contact Us',
		content:
			'If you have questions about this Privacy Policy or our practices, please contact us at moroccoinfo@thymbol.com.',
	},
	{
		title: '',
		content:
			'By using Thymbol, you agree to this Privacy Policy and our practices regarding the collection and use of your information. Thank you for trusting us with your data.',
	},
];

const Privacy = () => {
	return (
		<section className="py-16">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-10">
					<h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
					<p className="text-sm text-gray-600 mt-2">
						Effective Date: 04 October 2024
					</p>
				</div>

				<div className="text-lg text-gray-700 space-y-8">
					{policySections.map((section, index) => (
						<div key={index}>
							{section.title && (
								<h2 className="text-2xl font-semibold text-gray-900">
									{section.title}
								</h2>
							)}
							<p>{section.content}</p>
							{section.listItems && (
								<ul className="list-disc list-inside space-y-2 pl-6">
									{section.listItems.map((item, i) => (
										<li key={i}>{item}</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Privacy;
