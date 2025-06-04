import Link from "next/link";

const NotFoundPage = () => {
  return (
    <>
      <div className="w-full mx-auto pt-20 text-red-700">
        <div>
          {/* Error message display */}
          <div className="text-center mt-20">
            <div className="flex justify-center items-center"></div>

            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            {/* Displaying error status text or message */}
            <p className="text-primary-base font-semibold">
              <i> 404 Page Not Found</i>
            </p>
          </div>

          {/* Button to navigate back to home page */}
          <div className="text-center mt-6">
            <Link href="/">
              <button content="Go Back to Home" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
