import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Textinput from '@/components/ui/Textinput';
import fetchWrapper from '@/util/fetchWrapper';
import { swalSuccess } from '@/util/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup
    .object({
        firstName: yup.string().required('First Name is required'),
        lastName: yup.string().required('Last Name is required'),
        email: yup
            .string()
            .email('Invalid email')
            .required('Email is required'),
    })
    .required();

const AdminUserForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { user_id } = useSelector((state) => state.auth);
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'all',
    });

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        setIsLoading(true);
        const payload = {
            ...data,
            userType: 'admin',
            createdBy: user_id,
        };
        try {
            const response = await fetchWrapper.post(`register`, payload);
            if (response) {
                swalSuccess('Admin created successfully', 'Admin Created!');
                navigate('/admins');
            }
        } catch (error) {
            toast.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h5>
                <strong>Create New Admin</strong>
            </h5>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-5 mt-5 app_height flex flex-col items-center justify-center"
            >
                <Card className="w-[400px] grid grid-cols-1 gap-5 rounded-lg">
                    <h6 className="font-semibold py-5">Create Admin</h6>
                    <div className="w-full space-y-5">
                        <Textinput
                            name="firstName"
                            label="First Name"
                            type="text"
                            placeholder="Enter First Name"
                            register={register}
                            error={errors.firstName}
                            className="h-[48px]"
                            onChange={(e) => {
                                setValue('firstName', e.target.value);
                            }}
                        />
                        <Textinput
                            name="lastName"
                            label="Last Name"
                            type="text"
                            placeholder="Enter your Last Name"
                            register={register}
                            error={errors.lastName}
                            className="h-[48px]"
                            onChange={(e) => {
                                setValue('lastName', e.target.value);
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

                        <Button
                            type="submit"
                            text="Create Admin"
                            className="btn btn-primary btn-md w-full block mt-5 text-center "
                            isLoading={isLoading}
                            disabled={isLoading}
                        />
                    </div>
                </Card>
            </form>
        </div>
    );
};

export default AdminUserForm;
