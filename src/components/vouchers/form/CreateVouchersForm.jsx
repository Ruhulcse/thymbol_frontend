import React, { useEffect, useState } from 'react';
import Textinput from '@/components/ui/Textinput';
import Button from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@/components/ui/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterUserMutation } from '@/store/api/auth/authApiSlice';
import toast from 'react-hot-toast';
import Card from '@/components/ui/Card';
import { getUser } from '@/store/api/user/userSlice';
import fetchWrapper from '@/util/fetchWrapper';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import DropZone from '@/pages/form/file-input/DropZone';

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

const discounts = Array.from({ length: 19 }, (_, index) => {
    const discount = (index + 1) * 5;
    return { value: discount.toString(), label: discount.toString() };
});

const schema = yup
    .object({
        businessName: yup.string().required('Business Name is required'),
        userName: yup.string().required('Username is required'),
        email: yup
            .string()
            .email('Invalid email')
            .required('Email is required'),
        phoneNumber: yup
            .string()
            .required('Phone Number is required')
            .matches(
                /^(\+?\d{1,3}[- ]?)?\d{10}$/,
                'Phone Number must be a valid phone number'
            ),
        address: yup.string().required('Address is required'),
    })
    .required();

const CreateVouchersForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            ...user,
        },
        mode: 'onChange',
    });

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            console.log(data);
            const response = await fetchWrapper.put(`user/${user?._id}`, data);
            if (response) {
                setIsLoading(false);
                toast.success('Profile updated successfully');
                dispatch(getUser({ user_id: user?._id }));
            }
        } catch (error) {
            toast.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-5">
            <h4>
                <strong>Add Voucher</strong>
            </h4>
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5 w-full xl:w-2/3">
                <DropZone />
            </div>
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5 w-full xl:w-2/3">
                <div>
                    <label htmlFor=" discount" className="form-label ">
                        Discount %
                    </label>
                    <Select
                        className="react-select"
                        classNamePrefix="select"
                        // defaultValue={furits[0]}
                        options={discounts}
                        styles={styles}
                        id="discount"
                    />
                </div>
                <div>
                    <label htmlFor="default-picker" className=" form-label">
                        Offer end date
                    </label>

                    <Flatpickr
                        className="form-control py-3"
                        // value={picker}
                        // onChange={(date) => setPicker(date)}
                        id="default-picker"
                        disabled={false}
                        readOnly={false}
                    />
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
                    <label htmlFor=" storeName" className="form-label ">
                        Store Name
                    </label>
                    <Select
                        className="react-select"
                        classNamePrefix="select"
                        // defaultValue={furits[0]}
                        options={[]}
                        styles={styles}
                        id="storeName"
                    />
                </div>
                <div>
                    <label htmlFor=" subCategory" className="form-label ">
                        Subcategory
                    </label>
                    <Select
                        className="react-select"
                        classNamePrefix="select"
                        // defaultValue={furits[0]}
                        options={[]}
                        styles={styles}
                        id="subCategory"
                    />
                </div>
                <div>
                    <label htmlFor=" reedemOffer" className="form-label ">
                        Number of offers that can be redeemed
                    </label>
                    <Select
                        className="react-select"
                        classNamePrefix="select"
                        // defaultValue={furits[0]}
                        options={[]}
                        styles={styles}
                        id="reedemOffer"
                    />
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

                <div></div>

                <Button
                    type="submit"
                    text="Create Voucher"
                    className="btn btn-primary block mt-5 text-center font-normal"
                    isLoading={isLoading}
                    disabled={isLoading}
                />
            </div>
        </form>
    );
};

export default CreateVouchersForm;
