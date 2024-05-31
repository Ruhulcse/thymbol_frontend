import React, { useEffect, useRef, useState } from 'react';
import Textinput from '@/components/ui/Textinput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '@/store/api/auth/authApiSlice';
import { setUser } from '@/store/api/auth/authSlice';
import toast from 'react-hot-toast';
import { getUser } from '@/store/api/user/userSlice';
const schema = yup
    .object({
        email: yup
            .string()
            .email('Invalid email')
            .required('Email is Required'),
        password: yup.string().required('Password is Required'),
    })
    .required();
const LoginForm = () => {
    const [login, { isLoading, isError, error, isSuccess }] =
        useLoginMutation();

    const dispatch = useDispatch();

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm({
        resolver: yupResolver(schema),
        //
        mode: 'all',
    });

   

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const response = await login(data);

            console.log(response.data);

            if (response.error) {
                throw new Error(response.error.message);
            }

            if (response.data.data.error) {
                throw new Error(response.data.error);
            }

            if (!response.data.data.token) {
                throw new Error('Invalid credentials');
            }

            dispatch(
                setUser({
                    token: response.data.data?.token,
                    user_id: response.data.data?._id,
                })
            );
            dispatch(getUser({ user_id: response.data.data?._id }));
            localStorage.setItem(
                'auth',
                JSON.stringify({
                    accessToken: response.data.data?.token,
                    user_id: response.data.data?._id,
                })
            );
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.message);
        }
    };

    const [checked, setChecked] = useState(false);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <Textinput
                name="email"
                label="email"
                type="email"
                register={register}
                error={errors.email}
                className="h-[48px]"
                placeholder="Email"
                onChange={(e) => {
                  setValue('email', e.target.value);
                }}
            />
            <Textinput
                name="password"
                label="passwrod"
                type="password"
                register={register}
                error={errors.password}
                className="h-[48px]"
                placeholder="Password"
                onChange={(e) => {
                  setValue('password', e.target.value);
                }}
            />
            <div className="flex justify-end">
                <Link
                    to="/forgot-password"
                    className="text-sm text-customBlue dark:text-slate-400 leading-6 font-medium"
                >
                    Forgot Password?{' '}
                </Link>
            </div>

            <Button
                type="submit"
                text="Sign in"
                className="btn btn-primary block w-full text-center "
                isLoading={isLoading}
            />
        </form>
    );
};

export default LoginForm;
