"use client";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { IoSearch } from "react-icons/io5";
import { useDebounce } from "@/hooks/useDebounce";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import NotFound from "../common/NotFound/NotFound";
import AccountPagination from "../common/AccountPagination/AccountPagination";
import DeleteIcon from "../common/DeleteIcon/DeleteIcon";
import EditIcon from "../common/EditIcon/EditIcon";
import { truncateCharacters } from "@/utils/descriptionTextCounter";
import TableSkeleton from "../common/Loading/TableSkeleton";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/api/productsApi";

const AllProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchValue, setSearchValue] = useState({});
  const debouncedQuery = useDebounce(searchQuery);

  const query = {
    search: debouncedQuery,
    ...searchValue,
  };

  console.log(query, "query"); // check what's sent to the API

  const { data, error, isLoading, refetch } = useGetAllProductsQuery(query);
  const [deleteProduct] = useDeleteProductMutation();

  // Filters companies based on the search query
  const filteredData = data?.data?.data;

  const handleDeleteProduct = async (product) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Are you sure you want to delete the product "${product?.name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const response = await deleteProduct(product?.id).unwrap();
        if (response?.success) {
          Swal.fire({
            title: "Deleted!",
            text: `The product "${product?.name}" has been successfully deleted.`,
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: `${response?.message}`,
            icon: "error",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `An error occurred: ${error.data || error.message}`,
        icon: "error",
      });
    }
  };

  // Render loading state
  if (isLoading) {
    return <TableSkeleton />;
  }

  // Render error state if there was an error fetching data
  // if (error) {
  //   return (
  //     <div className="flex h-[85vh] w-full items-center justify-center">
  //       <h1>Error: {error.message}</h1>
  //     </div>
  //   );
  // }

  return (
    <div className="md:px-6  p-4 pb-4 rounded-lg">
      <div className="bg-[#0D0E12]  top-[75px] md:top-[82px] z-[450] py-2 md:py-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 ">
          <div className="w-full">
            <SectionTitle
              big_title={"All products"}
              link_one={"/"}
              title_one={"Home"}
              title_two={"All products"}
              link_two={"/product/all-products"}
            />
          </div>
          {/* Search input with icon */}
          <div className="flex items-center w-full justify-between md:justify-end gap-4">
            <div className="relative w-full max-w-xs">
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for..."
                className="text-[14px] bg-[#14151A]  border border-[#26272F] rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
              />
            </div>
            {/* Link to create a new company */}
            <Link href="/product/add-product">
              <button className="btn w-[150px] md:w-64">Add product</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full pt-2 mt-6">
        <h1 className="table_header">All products</h1>
        <div className="overflow-x-auto w-full">
          <div className="table_section">
            <table className="w-full">
              <thead>
                <tr className="table_row ">
                  <th className="table_th w-4">#SL</th>
                  <th className="table_th">Product Name</th>
                  <th className="table_th">Product Code</th>
                  <th className="table_th">product price</th>
                  <th className="table_th">Stock Qty</th>

                  <th className="table_th text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="tbody_tr">
                      <td className="table_th">{index + 1}</td>
                      <td className="table_th ">
                        <div className="w-36">
                          <p>{truncateCharacters(item?.name, 30)}</p>
                        </div>
                      </td>
                      <td className="table_th">
                        <div className="w-36">
                          <p>{truncateCharacters(item?.code, 30)}</p>
                        </div>
                      </td>
                      <td className={`table_th text-center `}>
                        {Number(item?.price).toFixed(2)}
                      </td>
                      <td className="table_th">{Number(item?.stock_qty)}</td>

                      <td className="my-2 px-4 text-center ">
                        <div className="flex items-center justify-center w-full gap-2">
                          <EditIcon
                            edit_link={`/product/edit-product/${item?.id}`}
                          />
                          <DeleteIcon
                            handleDelete={handleDeleteProduct}
                            item={item}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  // Display message when no companies match the search criteria
                  <tr>
                    <td
                      colSpan="10"
                      className="bg-black-base text-center py-6 text-red-600 text-2xl font-bold"
                    >
                      <NotFound />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          {data?.data?.meta?.totalPages > 0 && (
            <AccountPagination
              refetch={refetch}
              total={data?.data?.meta?.total}
              setSearchValue={setSearchValue}
              searchValue={searchValue}
              totalPage={data?.data?.meta?.totalPages}
              limit={data?.data?.meta?.limit}
              page={data?.data?.meta?.page}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
