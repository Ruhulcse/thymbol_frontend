import { t } from 'i18next';
import { Link } from 'react-router-dom';
import Modal from '../ui/Modal';
const UpgradeModal = ({ activeModal, setActiveModal }) => {
	const onClose = () => {
		setActiveModal(false);
	};
	return (
		<Modal
			onClose={onClose}
			activeModal={activeModal}
			themeClass="bg-[#38b6ff]"
			className={`bg-[#38b6ff] w-[680px] rounded-[15px]  max-w-xl`}
			title=""
			centered
		>
			<div className="bg-[#38b6ff]">
				<div className="w-full ">
					<div></div>
					<div className="text-center flex flex-col items-center justify-center space-y-2 text-white">
						{''}
						<div className="relative w-fit">
							<p className="text-center font-bold text-4xl text-white ">
								{t('subscription title')}
							</p>
							<img
								className="absolute bottom-8 w-10"
								src="/crown.png"
								alt="crown"
							/>
						</div>
						<p className="text-base">{t('subscription details')}</p>
					</div>
				</div>
			</div>
			<div className="flex w-full items-center justify-center mt-4">
				<Link
					className="bg-[#004bad] text-white font-semibold text-xl py-2 px-4 rounded-xl"
					to="/consumer-subscription"
				>
					{t('subscription btn')}
				</Link>
			</div>
		</Modal>
	);
};

export default UpgradeModal;
