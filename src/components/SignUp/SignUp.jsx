"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Input from "../common/Forms/Input";
import { useCreateUserMutation } from "@/redux/api/userApi";

import { ImSpinner10 } from "react-icons/im";
import { storeOTPData } from "@/redux/features/otpSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // Strong password pattern
  const pattern = {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character",
  };
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [createUser, { isLoading }] = useCreateUserMutation();

  const onSubmit = async (data) => {
    const user = {
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
    };

    try {
      const res = await createUser(user).unwrap();
      console.log(res, "res,,,,,,,,");

      if (res?.success) {
        dispatch(storeOTPData(res?.data));
        reset();
        toast.success(
          res?.message ||
            "Your account has been successfully created! Please verify your email or mobile number .",
          {
            position: toast.TOP_RIGHT,
          }
        );

        router.push("/otp");
      }
      if (!res?.success) {
        toast.error(
          res?.message ||
            "We couldn't process your registration at this time. Please try again later or contact support.",
          {
            position: toast.TOP_RIGHT,
          }
        );
      }
    } catch (error) {
      toast.error(
        error?.message ||
          "Something went wrong! Please check your details and try again.",
        {
          position: toast.TOP_RIGHT,
        }
      );
    }
  };
  return (
    <div
      className="text-white h-screen w-[720px] grid place-items-center bg-[#0D0E12]"
      style={{
        backgroundImage: "url('/assets/images/signinBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        width: "100%",
        height: "60vh",
      }}
    >
      {" "}
      <div
        className="absolute bottom-48  flex-shrink-0"
        style={{
          width: "922.908px",
          height: "922.908px",
          borderRadius: "922.908px",
          opacity: 0.3,
          backgroundColor: "#8AB8FB", // You can customize this color if needed
          filter: "blur(250px)",
        }}
      ></div>
      <div className="w-[700px] top-20 md:top-48 mx-auto bg-info-base border border-[#26272F] px-6 py-7 relative rounded-xl overflow-hidden shadow-xl">
        <div className="absolute top-0 left-0 w-full h-[4px] animated-gradient"></div>
        <h1 className="text-gradient text-xl font-semibold border-0 border-b border-b-[#26272F] pb-2 text-gradient">
          Sign Up
        </h1>
        <form className="w-full pt-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Enter your Name"
            text="name"
            label="Your Name"
            register={register}
            errors={errors}
          />

          <div className="pt-3">
            <Input
              placeholder="Mobile Number"
              text="mobile"
              type="number"
              label="Mobile Number"
              register={register}
              errors={errors}
            />
          </div>
          <Input
            placeholder="Enter your email"
            text="email"
            type="email"
            label="Email"
            register={register}
            errors={errors}
          />

          <Input
            placeholder="Enter your password"
            text="password"
            type="password"
            label="Password"
            register={register}
            pattern={pattern}
            errors={errors}
          />
          <Input
            placeholder="Enter your confirm password"
            text="confirmPassword"
            type="password"
            label="Confirm Password"
            register={register}
            pattern={pattern}
            errors={errors}
            validate={(value) =>
              value === watch("password") || "Passwords do not match"
            }
          />

          <button className="mt-4 btn w-full cursor-pointer" type="submit">
            {isLoading ? (
              <ImSpinner10 className="mx-auto w-5 h-5 animate-spin" />
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

// import React from "react";

// const SignUp = () => {
//   return <div className="text-red-400 text-2xl p-20">SignUp</div>;
// };

// export default SignUp;
