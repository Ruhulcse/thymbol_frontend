import Button from '@/components/ui/Button';
import Textinput from '@/components/ui/Textinput';
import { getUser } from '@/store/api/user/userSlice';
import fetchWrapper from '@/util/fetchWrapper';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import * as yup from 'yup';

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

const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];

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

const UserProfileForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user);
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
        control,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            ...user,
        },
        mode: 'all',
    });

    useEffect(() => {
        if (user) {
            setValue('gender', genderOptions.find(option => option.value === user.gender));
        }
    }, [user, setValue]);

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const payload = {
                ...data,
                gender: data.gender.value,
            };
            const response = await fetchWrapper.put(
                `user/${user?._id}`,
                payload
            );
            if (response) {
                setIsLoading(false);
                toast.success('Profile updated successfully');
                dispatch(getUser({ user_id: user?._id }));
                navigate('/dashboard');
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
                <strong>Edit Profile</strong>
            </h4>
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-5 w-2/3">
                <Textinput
                    name="businessName"
                    label="Business Name"
                    type="text"
                    placeholder="Enter your Business Name"
                    register={register}
                    error={errors.businessName}
                    className="h-[48px]"
                    onChange={(e) => {
                        setValue('businessName', e.target.value);
                    }}
                />
                <Textinput
                    name="userName"
                    label="Username"
                    type="text"
                    placeholder="Enter your Username"
                    register={register}
                    error={errors.userName}
                    className="h-[48px]"
                    onChange={(e) => {
                        setValue('userName', e.target.value);
                    }}
                />
                <Textinput
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your Email Address"
                    register={register}
                    error={errors.email}
                    className="h-[48px]"
                    onChange={(e) => {
                        setValue('email', e.target.value);
                    }}
                />
                <Textinput
                    name="phoneNumber"
                    label="Phone Number"
                    type="text"
                    placeholder="Enter your Phone Number"
                    register={register}
                    error={errors.phoneNumber}
                    className="h-[48px]"
                    onChange={(e) => {
                        setValue('phoneNumber', e.target.value);
                    }}
                />
                <Textinput
                    name="address"
                    label="Address"
                    type="text"
                    placeholder="Enter your Address"
                    register={register}
                    error={errors.address}
                    className="h-[48px]"
                    onChange={(e) => {
                        setValue('address', e.target.value);
                    }}
                />

                <div>
                    <label htmlFor="gender" className="form-label ">
                        Gender
                    </label>
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                className="react-select"
                                classNamePrefix="select"
                                options={genderOptions?.map((gender) => ({
                                    value: gender.value,
                                    label: gender.label,
                                }))}
                                isLoading={loading}
                                styles={styles}
                            />
                        )}
                    />
                    {errors.gender && (
                        <p className="text-red-500 font-normal text-sm mt-1">
                            {errors.gender.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    text="Update"
                    className="btn btn-primary block mt-5 text-center "
                    isLoading={isLoading}
                    disabled={isLoading}
                />
            </div>
        </form>
    );
};

export default UserProfileForm;
