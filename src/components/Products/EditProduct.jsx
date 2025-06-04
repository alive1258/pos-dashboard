"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/api/productsApi";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import FetchLoading from "../common/Loading/FetchLoading";
import Input from "../common/Forms/Input";
import Loading from "../common/Loading/Loading";

const EditProduct = ({ id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const {
    data: productData,
    isLoading: fetchLoading,
    error,
  } = useGetSingleProductQuery(id, { skip: !id });

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const router = useRouter();

  useEffect(() => {
    if (productData) {
      setValue("name", productData.data.name || "");
      setValue("code", productData.data.code || "");
      setValue("price", productData.data.price || "");
      setValue("stock_qty", productData.data.stock_qty || "");
    }
  }, [productData, setValue]);

  const onSubmit = async (data) => {
    try {
      const res = await updateProduct({ id, data }).unwrap();
      if (res?.success) {
        router.back();
        toast.success("Product  updated successfully!", {
          position: toast.TOP_RIGHT,
        });
      } else {
        toast.error(res.message, { position: toast.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred", {
        position: toast.TOP_RIGHT,
      });
    }
  };

  if (fetchLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error: {error?.message}</div>;

  return (
    <section className="md:px-6 mt-4 px-4 pb-4 rounded-lg">
      <SectionTitle
        big_title={"Edit Product"}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/product/all-products"}
        title_two={"All ProductS"}
        link_three={`/product/edit-product/${id}`}
        title_three={"Edit Product"}
      />

      <div className="add_form_section mt-4">
        <h1 className="add_section_title">Edit Product Step by Step</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
          <div className="cart-group grid sm:grid-cols-2 lg:grid-cols-2 items-end gap-y-2 gap-x-5">
            <Input
              placeholder="Enter Products Name"
              text="name"
              label="Products Name"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Product Code"
              text="code"
              label="Product Code "
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Product Price"
              text="price"
              type="number"
              label=" Product Price"
              register={register}
              errors={errors}
            />
            <Input
              placeholder="Enter Product Stock Qty"
              text="stock_qty"
              type="number"
              label="Product Stock Qty"
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <button disabled={isLoading} className="btn" type="submit">
              {isLoading ? <FetchLoading /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProduct;
