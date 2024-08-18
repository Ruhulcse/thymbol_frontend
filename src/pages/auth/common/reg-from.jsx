import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import { useRegisterUserMutation } from "@/store/api/auth/authApiSlice";
import { swalError } from "@/util/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema = yup
  .object({
    businessName: yup.string().required("Business Name is required"),
    userName: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email"),
    phoneNumber: yup
      .string()
      .test(
        "is-valid-phone",
        "Phone Number must be a valid phone number",
        function (value) {
          if (value) {
            return /^(\+?\d{1,3}[- ]?)?\d{10}$/.test(value);
          }
          return true; // Skip validation if the field is empty
        }
      ),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password shouldn't be more than 20 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  })
  .test(
    "email-or-phone",
    "Either Email or Phone Number is required",
    function (value) {
      return value.email || value.phoneNumber;
    }
  )
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
    mode: "all",
  });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        userType: "merchant",
      };
      const response = await registerUser(payload);
      if (response.error) {
        throw new Error(response.error.message);
      }
      reset();
      navigate("/login");
      toast.success("Signup Successful");
    } catch (error) {
      console.log("🚀  ~ error:", error);
    }
  };

  if (isError && !isLoading) {
    swalError(error.data.message);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
      <Textinput
        name="businessName"
        label={t("Business Name")}
        type="text"
        placeholder={t("Enter your Business Name")}
        register={register}
        error={errors.businessName}
        className="h-[48px]"
      />
      <Textinput
        name="userName"
        label={t("Username")}
        type="text"
        placeholder={t("Enter your Username")}
        register={register}
        error={errors.userName}
        className="h-[48px]"
      />
      <Textinput
        name="email"
        label={t("Email")}
        type="text"
        placeholder={t("Email")}
        register={register}
        error={errors.email}
        className="h-[48px]"
      />
      <p className="text-center">OR</p>
      <Textinput
        name="phoneNumber"
        label={t("Phone Number")}
        type="text"
        placeholder={t("Enter your Phone Number")}
        register={register}
        error={errors.phoneNumber}
        className="h-[48px]"
      />
      <Textinput
        name="password"
        label={t("Password")}
        type="password"
        placeholder={t("Password")}
        register={register}
        error={errors.password}
        className="h-[48px]"
      />
      <Textinput
        name="confirmPassword"
        label={t("Confirm Password")}
        type="password"
        placeholder={t("Enter your Password again")}
        register={register}
        error={errors.confirmPassword}
        className="h-[48px]"
      />

      <Button
        type="submit"
        text={t("Sign up")}
        className="btn btn-primary block w-full text-center"
        isLoading={isLoading}
      />
    </form>
  );
};

export default RegForm;
