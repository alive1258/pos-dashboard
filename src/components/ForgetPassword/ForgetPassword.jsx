"use client";

import { useForgetPasswordMutation } from "@/redux/api/authApi";
import { storeOTPData } from "@/redux/features/otpSlice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Input from "../common/Forms/Input";
import FetchLoading from "../common/Loading/FetchLoading";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // call forget password api
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  // handle input data function

  const onSubmit = async (data) => {
    try {
      const res = await forgetPassword(data).unwrap();

      if (res?.success) {
        reset();
        // save user info into redux state
        dispatch(storeOTPData(res?.data));

        toast.success("Success! Please check your email.", {
          position: toast.TOP_RIGHT,
        });
        router.push("/verify-otp");
      }
      if (!res?.success) {
        toast.error(res?.message || "Something Went wrong!", {
          position: toast.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error(error?.message || "Something Went wrong!", {
        position: toast.TOP_RIGHT,
      });
    }
  };

  return (
    <div
      className=" flex items-center justify-center h-screen bg-[#0D0E12]"
      style={{
        backgroundImage: "url('/assets/images/signinBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        width: "100%",
        height: "60vh",
      }}
    >
      {/* Background Blur Circle */}
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

      <div className="md:px-6 relative z-10">
        <div className="md:w-[556px] w-[350px] top-20 md:top-48 mx-auto bg-info-base border border-[#26272F] px-6 py-12 relative rounded-xl overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-full h-[4px] animated-gradient"></div>
          <div>
            <h4 className="text-xl font-semibold border-0 border-b border-b-[#26272F] pb-2 text-gradient">
              Forget Password
            </h4>

            <form onSubmit={handleSubmit(onSubmit)} className="pt-4 space-y-2">
              <Input
                placeholder="Enter your email"
                text="email"
                type="email"
                label="Email"
                register={register}
                errors={errors}
              />

              <div className="text-center">
                <button
                  className="mt-4 btn w-full cursor-pointer"
                  type="submit"
                >
                  {isLoading ? <FetchLoading /> : <span>Submit</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
