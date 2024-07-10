import Button from '@/components/ui/Button';
import Textinput from '@/components/ui/Textinput';
import { useRegisterUserMutation } from '@/store/api/auth/authApiSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
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
        password: yup
            .string()
            .min(8, 'Password must be at least 8 characters')
            .max(20, "Password shouldn't be more than 20 characters")
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    })
    .required();

const RegForm = () => {
    const [registerUser, { isLoading, isError, error, isSuccess }] =
        useRegisterUserMutation();

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'all',
    });

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                userType: 'merchant',
            };
            const response = await registerUser(payload);
            if (response.error) {
                throw new Error(response.error.message);
            }
            reset();
            navigate('/login');
            toast.success('Signup Successful');
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                'An error occurred. Please try again later.';

            if (errorMessage === 'Email is already registered') {
                toast.error(errorMessage);
            } else {
                toast.warning(errorMessage);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
            <Textinput
                name="businessName"
                label="Business Name"
                type="text"
                placeholder="Enter your Business Name"
                register={register}
                error={errors.businessName}
                className="h-[48px]"
            />
            <Textinput
                name="userName"
                label="Username"
                type="text"
                placeholder="Enter your Username"
                register={register}
                error={errors.userName}
                className="h-[48px]"
            />
            <Textinput
                name="email"
                label="Email"
                type="text"
                placeholder="Enter your Email Address"
                register={register}
                error={errors.email}
                className="h-[48px]"
            />
            <Textinput
                name="phoneNumber"
                label="Phone Number"
                type="text"
                placeholder="Enter your Phone Number"
                register={register}
                error={errors.phoneNumber}
                className="h-[48px]"
            />
            <Textinput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your Password"
                register={register}
                error={errors.password}
                className="h-[48px]"
            />
            <Textinput
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Enter your Password again"
                register={register}
                error={errors.confirmPassword}
                className="h-[48px]"
            />

            <Button
                type="submit"
                text="Sign Up"
                className="btn btn-primary block w-full text-center"
                isLoading={isLoading}
            />
        </form>
    );
};

export default RegForm;
