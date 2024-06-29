import TopSection from '@/components/merchant/TopSection';
import VoucherSection from '@/components/merchant/VoucherSection';
import ModalsVideo from '@/components/modalVideo';
import { voucherData } from '@/data/voucherData';

function Merchant() {
    return (
        <div className="bg-[#F3FCFF] ">
            <TopSection />
            <VoucherSection data={voucherData} />
            <ModalsVideo />
        </div>
    );
}

export default Merchant;
