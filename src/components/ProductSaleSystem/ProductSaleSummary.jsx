"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addToCartSale } from "@/redux/features/saleCartSlice";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import SelectAndSearch from "../common/SelectAndSearch/SelectAndSearch";

const ProductSaleSummary = ({ setSelectedProduct }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm();

  const dispatch = useDispatch();

  const watchProductId = watch("id");
  const watchProductName = watch("name");

  // Debounced product name for search
  const debouncedSearch = useDebounce(watchProductName);

  const { data: productData } = useGetAllProductsQuery({
    search: debouncedSearch,
  });

  const productsData = productData?.data?.data || [];

  console.log(productsData, "productsData.........");
  const selectedProductData = productsData.find(
    (product) => product?.id === watchProductId
  );

  useEffect(() => {
    setValue("id", watchProductId);
    setValue("name", watchProductName);
  }, [watchProductId, watchProductName, setValue]);

  const onSubmit = (data) => {
    if (!selectedProductData) return;

    const quantity = parseInt(data?.quantity);
    const price = parseFloat(selectedProductData?.price); // Ensure it's a number

    const saleOfCartProduct = {
      id: selectedProductData.id,
      name: selectedProductData.name,
      code: selectedProductData.code,
      price: price,
      stock_qty: selectedProductData.stock_qty || 0,
      quantity: quantity,
      subTotal: price * quantity,
    };
    console.log(saleOfCartProduct, "saleOfCartProduct");
    dispatch(addToCartSale(saleOfCartProduct));

    reset();
    setSelectedProduct(null);
  };

  const handleSelectProduct = (product) => {
    if (product) {
      setValue("id", product.id);
      setValue("name", product.name);
    }
  };

  return (
    <div>
      <h1 className="add_section_title p-4">Make Product Sales</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-1">
        {/* Product Select */}
        <div>
          <SelectAndSearch
            options={productsData.map((product) => ({
              id: product.id,
              name: product.name,
            }))}
            type_id="id"
            type_name="name"
            label="Select Product"
            placeholder="Select a Product"
            register={register}
            required
            setValue={setValue}
            handleSelect={handleSelectProduct}
            errors={errors}
            message="Product is required"
          />
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            className="input_style mt-1"
            {...register("quantity", { required: "Quantity is required" })}
          />
          {errors?.quantity && (
            <p className="text-red-500">{errors.quantity.message}</p>
          )}
        </div>
        {/* Live Price & Subtotal Display */}
        {selectedProductData && (
          <div className="space-y-4 mt-4">
            <div className="input_style">
              <p className="text-sm font-medium flex justify-between items-center">
                <span className="text-[#b5b7c8]">Product Price :</span> ৳
                {selectedProductData.price}
              </p>
            </div>
            <div className="input_style">
              <p className="text-sm font-medium flex justify-between items-center">
                <span className="text-[#b5b7c8]">In Stock :</span>{" "}
                {selectedProductData.stock_qty ?? 0}
              </p>
            </div>
            <div className="input_style">
              <p className="text-sm font-medium flex justify-between items-center">
                <span className="text-[#b5b7c8]">Subtotal :</span> ৳
                {(
                  parseFloat(selectedProductData.price) *
                  parseInt(watch("quantity") || 0)
                ).toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* Submit */}
        <div>
          <button className="btn mt-4" type="submit">
            Add To Cart
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductSaleSummary;
