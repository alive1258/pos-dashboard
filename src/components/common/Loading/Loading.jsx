const Loading = () => {
  return (
    <div
      className=" flex items-center justify-center h-screen bg-[#0D0E12]"
      style={{
        backgroundImage: "url('/assets/images/signinBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <div className="flex justify-center items-center h-screen ">
        <div className="flex space-x-4">
          <div className="h-8 w-8 bg-[#0064f7] rounded-full dot delay-0"></div>
          <div className="h-8 w-8 bg-[#0064f7] rounded-full dot delay-300"></div>
          <div className="h-8 w-8 bg-[#0064f7] rounded-full dot delay-600"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
