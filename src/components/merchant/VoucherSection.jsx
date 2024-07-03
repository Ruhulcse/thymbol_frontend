import ViewMore from '@/components/button/ViewMore';
import Title from '@/components/title';
import VoucherList from '@/components/voucherCard/VoucherList';

function VoucherSection() {
    return (
        <div>
            <Title>Our Lattest Coupons</Title>
            <VoucherList />
            <ViewMore className={'hidden md:flex'} />
        </div>
    );
}

export default VoucherSection;
