import Button from '@/components/ui/Button';
import Textinput from '@/components/ui/Textinput';
import DropZone from '@/pages/form/file-input/DropZone';
import { useGetStoresQuery } from '@/store/api/stores/storesApiSlice';
import { useCreateVoucherMutation } from '@/store/api/vouchers/vouchersApiSlice';
import { swalSuccess } from '@/util/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import Flatpickr from 'react-flatpickr';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import * as yup from 'yup';

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: '14px',
    }),
    control: (provided, state) => ({
        ...provided,
        // fontSize: "14px",
        padding: '4px 6px',
    }),
};

const discounts = Array.from({ length: 16 }, (_, index) => {
    const discount = (index + 1 + 3) * 5;
    return { value: discount.toString(), label: discount.toString() };
});

const additionalDiscounts = [
    { value: 'Buy One Get One Free', label: 'Buy One Get One Free' },
    { value: 'Buy One Get One Half Off', label: 'Buy One Get One Half Off' },
];

const allDiscounts = [...additionalDiscounts, ...discounts];

const offersReedem = Array.from({ length: 20 }, (_, index) => {
    const offerCount = index + 1;
    return { value: offerCount.toString(), label: offerCount.toString() };
});

const schema = yup
    .object({
        logo: yup.array().min(1, 'Logo is required'),
        discount: yup.object().required('Discount is required'),
        endDate: yup.date().required('Offer end date is required'),
        voucherCode: yup.string().required('Voucher code is required'),
        storeName: yup.object().required('Store name is required'),
        redeemLimit: yup.object().required('Number of offers is required'),
        condition: yup.string().required('Condition is required'),
    })
    .required();

const CreateVouchersForm = () => {
    const discountsMemo = useMemo(() => allDiscounts, []);
    const offersReedemMemo = useMemo(() => offersReedem, []);
    const { user_id } = useSelector((state) => state.auth);
    const { data: stores, isLoading: loadingStores } =
        useGetStoresQuery(user_id);
    const [createVoucher, { isLoading: isCreating, error: createError }] =
        useCreateVoucherMutation();

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        const formData = new FormData();
        if (data?.logo?.length) {
            formData.append('image', data.logo[0]);
        }

        const jsonData = {
            discount: data.discount.value,
            creator: user_id,
            endDate: data.endDate,
            voucherCode: data.voucherCode,
            store: data.storeName.value,
            storeName: data.storeName.label,
            redeemLimit: data.redeemLimit.value,
            condition: data.condition,
        };
        formData.append('voucherData', JSON.stringify(jsonData));
        await createVoucher({
            voucherData: formData,
        }).unwrap();

        swalSuccess(`Voucher successfully added!`, 'Voucher Created!');
        navigate('/vouchers');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-5">
            <h4>
                <strong>Add Voucher</strong>
            </h4>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-full md:w-2/3">
                <Controller
                    name="logo"
                    control={control}
                    render={({ field }) => (
                        <DropZone
                            title="Upload pdf/jpeg"
                            onDrop={(files) => field.onChange(files)}
                            files={field.value || []}
                        />
                    )}
                />
                {errors.logo && (
                    <p className="text-red-500">{errors.logo.message}</p>
                )}
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-full md:w-2/3">
                <div>
                    <label htmlFor="discount" className="form-label ">
                        Discount %
                    </label>
                    <Controller
                        name="discount"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className="react-select"
                                classNamePrefix="select"
                                options={discountsMemo?.map((discount) => ({
                                    value: discount.value,
                                    label: discount.label,
                                }))}
                                styles={styles}
                            />
                        )}
                    />
                    {errors.discount && (
                        <p className="text-red-500 font-normal text-sm mt-1">
                            {errors.discount.message}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="endDate" className="form-label">
                        Offer end date
                    </label>
                    <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                            <Flatpickr
                                className="form-control py-3 text-black-500"
                                id="endDate"
                                {...field}
                                disabled={false}
                                readOnly={false}
                            />
                        )}
                    />
                    {errors.endDate && (
                        <p className="text-red-500 font-normal text-sm mt-1">
                            {errors.endDate.message}
                        </p>
                    )}
                </div>
                <Textinput
                    name="voucherCode"
                    label="Voucher Code"
                    type="text"
                    placeholder="Enter Voucher Code"
                    register={register}
                    error={errors.voucherCode}
                    className="h-[48px]"
                    onChange={(e) => {
                        setValue('phoneNumber', e.target.value);
                    }}
                />
                <div>
                    <label htmlFor="storeName" className="form-label">
                        Store Name
                    </label>
                    <Controller
                        name="storeName"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className="react-select"
                                classNamePrefix="select"
                                options={stores?.map((store) => ({
                                    value: store._id,
                                    label: store.store_name,
                                }))}
                                isLoading={loadingStores}
                                styles={styles}
                                id="storeName"
                            />
                        )}
                    />
                    {errors.storeName && (
                        <p className="text-red-500 font-normal text-sm mt-1">
                            {errors.storeName.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="redeemLimit" className="form-label">
                        Number of offers that can be redeemed
                    </label>
                    <Controller
                        name="redeemLimit"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className="react-select"
                                classNamePrefix="select"
                                options={offersReedemMemo}
                                styles={styles}
                                id="redeemLimit"
                            />
                        )}
                    />
                    {errors.redeemLimit && (
                        <p className="text-red-500 font-normal text-sm mt-1">
                            {errors.redeemLimit.message}
                        </p>
                    )}
                </div>
                <Textinput
                    name="condition"
                    label="Condition"
                    type="text"
                    placeholder="Write condition"
                    register={register}
                    error={errors.condition}
                    className="h-[48px]"
                />

                <Button
                    type="submit"
                    text="Create Voucher"
                    className="btn btn-primary block mt-5 text-center font-normal"
                    isLoading={isCreating}
                    disabled={isCreating}
                />
            </div>
        </form>
    );
};

export default CreateVouchersForm;
