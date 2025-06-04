import VerifyOTP from "@/components/Otp/VerifyOTP";

const VerifyOTPPage = () => {
  return (
    <>
      <VerifyOTP redirectPath={"/reset-password"} />
    </>
  );
};

export default VerifyOTPPage;
