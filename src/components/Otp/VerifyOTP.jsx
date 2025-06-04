"use client";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ImSpinner10 } from "react-icons/im";

import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { useVerifyOTPMutation } from "@/redux/api/authApi";
import ResendOTP from "./ResendOTP";
import Input from "../common/Forms/Input";
import { removeOtpData } from "@/redux/features/otpSlice";

const VerifyOTP = ({ redirectPath }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { otpData } = useSelector((state) => state?.otpTree);

  const added_by = otpData?.id;

  const { data } = useGetSingleUserQuery(added_by, {
    skip: !added_by,
  });

  const email = data?.email;

  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  //u
  const onSubmit = async (data) => {
    try {
      const res = await verifyOTP({
        user_id: added_by,
        otp_code: data.otp_code,
      }).unwrap();
      if (res?.success) {
        reset();

        if (redirectPath) {
          router.push(redirectPath);
        }

        if (!res.data?.role_status) {
          router.push("/");
        }

        toast.success("Singed is successful!", {
          position: toast.TOP_RIGHT,
        });

        dispatch(removeOtpData());
      }
      if (!res?.success) {
        toast.error(res?.message || "Something Went wrong!", {
          position: toast.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error, "errorerrorerror");
      toast.error(error?.data || "Something Went wrong!", {
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
          <p className="text-xl font-semibold border-0 border-b border-b-[#26272F] pb-2 text-gradient">
            Verify OTP
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="Enter The OTP"
              text="otp_code"
              type="string"
              label="OTP"
              register={register}
              errors={errors}
            />

            <div className="text-center">
              <button
                className={`mt-4 p-2 btn w-full cursor-pointer`}
                type="submit"
              >
                {isLoading ? (
                  <ImSpinner10 className="mx-auto w-5 h-5 animate-spin" />
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </div>
          </form>
          <ResendOTP email={email} added_by={added_by} otpData={otpData} />
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
