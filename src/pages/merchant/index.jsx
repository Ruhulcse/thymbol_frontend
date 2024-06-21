import ModalsVideo from '@/components/modalVideo';
import UserLayout from '@/layout/UserLayout';
import TopSection from '@/components/merchant/TopSection';
import VoucherSection from '@/components/merchant/VoucherSection';
import { voucherData } from '@/data/voucherData';

function Merchant() {
  return (
    <div className='bg-[#F3FCFF] '>
      <UserLayout/>
     <TopSection/>
      <VoucherSection data={voucherData}/>
      <ModalsVideo/>
    </div>
  );
}

export default Merchant;
