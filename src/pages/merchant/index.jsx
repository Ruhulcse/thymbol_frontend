import TopSection from '@/components/merchant/TopSection';
import VoucherSection from '@/components/merchant/VoucherSection';
import ModalsVideo from '@/components/modalVideo';

function Merchant() {
    return (
        <div className="bg-[#F3FCFF] ">
            <TopSection />
            <VoucherSection />
            <ModalsVideo />
        </div>
    );
}

export default Merchant;
