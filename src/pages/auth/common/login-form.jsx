import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import { useLoginMutation } from "@/store/api/auth/authApiSlice";
import { setUser } from "@/store/api/auth/authSlice";
import { getUser } from "@/store/api/user/userSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { t } from "i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const phoneRegExp =
  /^(\+?\d{1,4}?[\s.-]?)?(\(?\d{1,3}?\)?[\s.-]?)?[\d\s.-]{7,}$/;

const schema = yup
  .object({
    email: yup
      .string()
      .test(
        "email-or-phone",
        (value) => {
          if (!value) {
            return `${t("Email or Phone number")} is Required`;
          }
          return `${t("Invalid email or phone number")}`;
        },
        (value) => {
          const isEmail = yup.string().email().isValidSync(value);
          const isPhone = yup.string().matches(phoneRegExp).isValidSync(value);
          return isEmail || isPhone;
        }
      )
      .required(`${t("Email or Phone number")} is Required`),
    password: yup.string().required(`${t("Password")} is Required`),
  })
  .required();
const LoginForm = () => {
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await login(data);

      if (!response?.data?.data?.token) {
        throw new Error("Invalid credentials");
      }

      dispatch(
        setUser({
          token: response.data.data?.token,
          user_id: response.data.data?._id,
          userType: response.data.data?.userType,
          SubscriptionType: response.data.data?.SubscriptionType,
        })
      );
      dispatch(getUser({ user_id: response.data.data?._id }));
      localStorage.setItem(
        "auth",
        JSON.stringify({
          accessToken: response.data.data?.token,
          user_id: response.data.data?._id,
          userType: response.data.data?.userType,
          SubscriptionType: response.data.data?.SubscriptionType,
        })
      );
      // if(response.data.data?.userType === 'consumer') {
      //     navigate('/home')
      // }
      // navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="email"
        label={t("Email or Phone number")}
        type="text"
        register={register}
        error={errors.email}
        className="h-[48px]"
        placeholder={t("Email or Phone number")}
        onChange={(e) => {
          setValue("email", e.target.value);
        }}
      />

      {/* <Textinput
        name="phone"
        label={t("phone")}
        type="phone"
        register={register}
        error={error.phone}
        className="h-[48px]"
        placeholder={t("phone")}
        onChange={(e) => {
          setValue("phone", e.target.value);
        }}
      /> */}
      <Textinput
        name="password"
        label={t("Password")}
        type="password"
        register={register}
        error={errors.password}
        className="h-[48px]"
        placeholder={t("Password")}
        onChange={(e) => {
          setValue("password", e.target.value);
        }}
      />
      <div className="flex justify-end">
        <div
          to="/forgot-password"
          className="text-sm cursor-pointer text-customBlue dark:text-slate-400 leading-6 font-medium"
          onClick={() =>
            (window.location.href = `${import.meta.env.VITE_API_APP_URL}/reset`)
          }
        >
          {t("Forgot Password?")}{" "}
        </div>
      </div>
      <Button
        type="submit"
        text={t("Sign In")}
        className="btn btn-primary block w-full text-center "
        isLoading={isLoading}
      />
    </form>
  );
};

export default LoginForm;
