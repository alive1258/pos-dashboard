"use client";
import ReactPaginate from "react-paginate";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

const AccountPagination = ({
  total,
  totalPage,
  setSearchValue,
  refetch,
  searchValue,
  limit,
  page,
}) => {
  // Handle pagination click
  const handlePageClick = ({ selected }) => {
    setSearchValue({ ...searchValue, page: selected + 1 });
    refetch();
  };

  // Handle entries change
  const handleEntityChange = (value) => {
    const numericValue = parseInt(value, 10);

    // Ensure the value is at least 1
    if (numericValue >= 1) {
      setSearchValue({ ...searchValue, limit: numericValue });
      refetch();
    }
  };

  return (
    <div className="w-full flex justify-between  bg-[#111217] border-b border-[#26272F] border-x rounded-b-lg py-3 px-4">
      <div className="flex items-center gap-3">
        <p className="text-sm">Rows per page</p>
        <input
          onChange={(e) => handleEntityChange(e.target.value)}
          className="input_style w-16 appearance-none hide-number-arrows text-center"
          type="number"
          min={1}
          defaultValue={limit}
          onKeyPress={(e) => {
            if (!/^\d$/.test(e.key)) e.preventDefault(); // Prevent non-numeric input
          }}
        />
        <p className="text-sm">
          {(page - 1) * limit + 1}-{limit * page} of {total} entries
        </p>
      </div>
      <ReactPaginate
        containerClassName="flex items-center gap-2"
        pageClassName="w-8 h-8 flex items-center justify-center input_style duration-200"
        activeClassName="outline-[1px] outline-gray-600  text-white bg-blue-500 hover:bg-blue-600"
        previousLabel={
          <div
            className={`opacity-50 flex items-center justify-center w-8 h-8 rounded-md text-lg border border-gray-500 dark:text-white hover:bg-gray-300 dark:hover:bg-primary-base duration-200 ${
              searchValue?.page === 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:opacity-80"
            }`}
          >
            <MdKeyboardDoubleArrowLeft />
          </div>
        }
        nextLabel={
          <div
            className={`opacity-50 flex items-center justify-center w-8 h-8 rounded-md text-lg border border-gray-500 dark:text-white hover:bg-gray-300 dark:hover:bg-primary-base duration-200 ${
              searchValue?.page === totalPage
                ? "opacity-40 cursor-not-allowed"
                : "hover:opacity-80"
            }`}
          >
            <MdKeyboardDoubleArrowRight />
          </div>
        }
        pageCount={totalPage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default AccountPagination;
