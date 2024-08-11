import offerUpgrade from '@/assets/images/background/upgrade_sub_bg.jpg';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
const UpgradeModal = ({ activeModal, setActiveModal }) => {
    const onClose = () => {
        setActiveModal(false);
    };
    return (
        <Modal
            onClose={onClose}
            activeModal={activeModal}
            themeClass="bg-[#FECB3E]"
            className={`bg-[#FECB3E] w-[680px]`}
            title=""
            centered
        >
            <div
                style={{
                    backgroundImage: `url('${offerUpgrade}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '300px',
                    width: '100%',
                    zIndex: 99999,
                }}
            >
                <div className="w-full grid grid-cols-2 items-end">
                    <div></div>
                    <div>
                        {' '}
                        <p className="mb-3 text-left text-black text-base font-medium">
                            Want to access the best Deals in Town?
                        </p>
                        <p className="text-left text-black text-base font-medium">
                            Upgrade to the Premium Subscribe
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex w-full items-center justify-center mt-4">
                <Button link={'/consumer-subscription'} text={'Upgrade Now'} />
            </div>
        </Modal>
    );
};

export default UpgradeModal;
