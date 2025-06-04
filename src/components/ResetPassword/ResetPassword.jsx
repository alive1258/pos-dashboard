"use client";

import {
  useResetPasswordMutation,
  useSignOutMutation,
} from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../common/Forms/Input";
import FetchLoading from "../common/Loading/FetchLoading";
import { passwordPattern } from "../common/patterns/patterns";

const ResetPassword = () => {
  const router = useRouter();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [signOut] = useSignOutMutation();

  const onSubmit = async (data) => {
    try {
      const res = await resetPassword({
        old_password: data.old_password,
        new_password: data.new_password,
        confirm_password: data.new_password,
      }).unwrap();

      if (res?.success) {
        reset();
        await signOut();
        toast.success(res?.message || "Password reset successful!", {
          position: toast.TOP_RIGHT,
        });
        router.push("/signin");
      } else {
        toast.error(res?.message || "Something went wrong!", {
          position: toast.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong!", {
        position: toast.TOP_RIGHT,
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-[#0D0E12]"
      style={{
        backgroundImage: "url('/assets/images/signinBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        width: "100%",
        height: "60vh",
      }}
    >
      <div
        className="absolute bottom-48 flex-shrink-0"
        style={{
          width: "922.908px",
          height: "922.908px",
          borderRadius: "922.908px",
          opacity: 0.3,
          backgroundColor: "#8AB8FB",
          filter: "blur(250px)",
        }}
      ></div>

      <div className="md:px-6 relative z-10">
        <div className="md:w-[556px] w-[350px] top-20 md:top-48 mx-auto bg-info-base border border-[#26272F] px-6 py-12 relative rounded-xl overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-full h-[4px] animated-gradient"></div>
          <div>
            <h4 className="text-xl font-semibold border-0 border-b border-b-[#26272F] pb-2 text-gradient">
              Reset Your Password
            </h4>

            <form onSubmit={handleSubmit(onSubmit)} className="pt-4 space-y-2">
              <Input
                placeholder="Enter your Old password"
                text="old_password"
                type="password"
                label="Old Password"
                register={register}
                pattern={passwordPattern}
                errors={errors}
              />
              <Input
                placeholder="Enter your new password"
                text="new_password"
                type="password"
                label="New Password"
                register={register}
                pattern={passwordPattern}
                errors={errors}
              />
              <Input
                placeholder="Re-enter your confirm password"
                text="confirm_password"
                type="password"
                label="Confirm Password"
                register={register}
                errors={errors}
                required
                validate={(value) =>
                  value === watch("new_password") || "Passwords do not match"
                }
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

export default ResetPassword;
