"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useCreateProductsMutation } from "@/redux/api/productsApi";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import Input from "../common/Forms/Input";
import FetchLoading from "../common/Loading/FetchLoading";

const AddProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const router = useRouter();

  const [createProducts, { isLoading }] = useCreateProductsMutation();

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        stock_qty: Number(data.stock_qty),
      };
      const res = await createProducts(payload).unwrap();

      if (res?.success) {
        reset();
        router.back();
        toast.success("Product added successfully!", {
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

  return (
    <section className="md:px-6 px-4 pb-4 rounded-lg">
      <SectionTitle
        big_title={"Add Products"}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/product/all-products"}
        title_two={"All Products"}
        title_three={"Add Products"}
        link_three={"/product/add-product"}
      />

      <div className="add_form_section mt-2">
        <h1 className="add_section_title">Create Products Step by Step</h1>
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

export default AddProduct;
