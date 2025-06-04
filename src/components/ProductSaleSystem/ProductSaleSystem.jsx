"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Input from "../common/Forms/Input";
import { toast } from "react-toastify";
import SectionTitle from "../common/SectionTitle/SectionTitle";
import ProductSaleSummary from "./ProductSaleSummary";
import CreateProductForSale from "./CreateProductForSale";
import { useCreateSaleSummariesMutation } from "@/redux/api/saleSummariesApi";
import FetchLoading from "../common/Loading/FetchLoading";
import { clearSaleCart } from "@/redux/features/saleCartSlice";

const ProductSaleSystem = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products } = useSelector((state) => state.saleCart);
  const { user } = useSelector((state) => state.auth);
  // useCreateSaleSummariesMutation
  const [createSaleSummary, { isLoading }] = useCreateSaleSummariesMutation();
  // calculate total quantity
  const totalQuantity = products?.reduce(
    (total, product) => total + (Number(product.quantity) || 0),
    0
  );

  // Calculate the total price (subTotal) for all products in the 'products' array
  const totalPrice = products?.reduce(
    (total, product) =>
      total + (Number(product?.quantity * product.price) || 0),
    0
  );

  // Form Submission
  const onSubmit = async (data) => {
    if (!products || products.length === 0) {
      return toast.error("Please add at least one product to checkout.");
    }

    try {
      const payload = {
        customer_phone: data.customer_phone,
        customer_name: data.customer_name,
        total_payment: Number(data.total_payment),
        total_quantity: totalQuantity,
        total_price: totalPrice,
        added_by: user?.id,
        products: products?.map((product) => ({
          product_id: product?.id,
          quantity: Number(product?.quantity),
          unit_price: Number(product?.price),
          total_price: Number(product?.price) * Number(product?.quantity),
        })),
      };

      const res = await createSaleSummary(payload).unwrap();

      if (res?.success) {
        toast.success("Sale Summary added successfully!");
        dispatch(clearSaleCart());
        reset({ customer_phone: "", total_payment: "" });
      } else {
        toast.error(res.message ?? "An error occurred.");
      }
    } catch (err) {
      toast.error(
        err?.data?.message || err?.message || "Failed to add Sale Summary."
      );
    }
  };

  return (
    <section className="px-4 mt-6 rounded-lg md:px-6">
      <SectionTitle
        big_title={"Make Product sale"}
        link_one={"/"}
        title_one={"Home"}
        link_two={"/sale-system/product-sale-system"}
        title_two={"All Sale Summary"}
        title_three={"Make sale"}
        // link_three={"/sales/sale-summaries/add-sale-summary"}
      />
      <div className="gap-5 mt-2 md:flex">
        {/* ProductPurchase  */}
        <div className="z-50 md:sticky top-[180px]  no-scrollbar md:max-h-[78vh] mb-5 md:w-[440px] border bg-info-base border-[#26272F]  h-fit rounded-lg">
          <ProductSaleSummary
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
          />
        </div>

        <div className="w-full mt-6 md:mt-3">
          {/* product table cart  */}
          <div>
            <CreateProductForSale />
          </div>
          {/* Create Product Form */}
          <div className="mt-6 mb-5 rounded-lg add_form_section h-fit">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* show cart info  */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 cart-group">
                {/* Total Quantity  */}

                <Input
                  placeholder="Enter customer_name"
                  text="customer_name"
                  label="customer_name "
                  register={register}
                  errors={errors}
                />
                <Input
                  placeholder="Enter customer_phone"
                  text="customer_phone"
                  label="customer_phone "
                  register={register}
                  errors={errors}
                />
                <Input
                  placeholder="Enter total_payment"
                  text="total_payment"
                  label="total_payment"
                  register={register}
                  errors={errors}
                />

                <Input
                  text="total_quantity"
                  label="Total Quantity"
                  required={false}
                  value={totalQuantity}
                  register={register}
                  errors={errors}
                  readOnly={true}
                />

                {/* Grand Total Product Price (Without Discount)  */}
                <Input
                  text="total_price_without_discount"
                  label="Total Product Price (-D)"
                  required={false}
                  value={totalPrice}
                  register={register}
                  errors={errors}
                  readOnly={true}
                />
              </div>

              {/* total  */}

              {/* submit button  */}
              <div>
                <button className="btn" type="submit">
                  {isLoading ? <FetchLoading /> : "Checkout"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSaleSystem;
