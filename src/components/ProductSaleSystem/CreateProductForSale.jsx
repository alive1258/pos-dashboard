"use client";

import { useSelector, useDispatch } from "react-redux";
import { truncateCharacters } from "@/utils/descriptionTextCounter";
import {
  removeFromSaleCart,
  updatedSaleQuantity,
} from "@/redux/features/saleCartSlice";
import DeleteIcon from "../common/DeleteIcon/DeleteIcon";
import Tooltip from "../common/Tooltip/Tooltip";
import NotFound from "../common/NotFound/NotFound";

const CreateProductForSale = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.saleCart);

  console.log(products, "products....../");
  // const grouped = [];
  // const map = new Map();
  // products?.forEach((item) => {
  //   const key = item.id;
  //   if (!map.has(key)) {
  //     map.set(key, { product: item?.name, data: [] });
  //     grouped.push(map.get(key));
  //   }
  //   map.get(key).data.push(item);
  // });

  const grouped = [];
  const map = new Map();
  products?.forEach((item, index) => {
    const key = item.id;
    if (!map.has(key)) {
      map.set(key, { product: item?.name, data: [] });
      grouped.push(map.get(key));
    }
    map.get(key).data.push({ ...item, originalIndex: index });
  });

  // Calculate total quantity
  const totalQuantity = products?.reduce(
    (total, product) => total + (Number(product.quantity) || 0),
    0
  );

  // calculate total unite price
  const totalSalePrice = products?.reduce(
    (total, product) =>
      total + (Number(product.price) || 0) * Number(product.quantity),
    0
  );

  // Handler to remove a product
  const handleDeleteProduct = (index) => {
    dispatch(removeFromSaleCart({ index }));
  };

  // Handler to update quantity (increment or decrement)
  const handleUpdateQuantity = (index, type) => {
    // Dispatch updated quantity action

    dispatch(
      updatedSaleQuantity({
        index,
        type,
      })
    );
  };

  return (
    <div className="mx-auto w-full">
      <h1 className="table_header">Carted Products</h1>
      <div className="overflow-x-auto w-full">
        <div className="table_section">
          <table className="w-full text-xs">
            <thead className="border-b border-gray-600">
              <tr className="table_row">
                <th className="table_th px-2 text-xs w-1">#SL</th>
                <th className={`table_th px-2 text-xs w-40`}>Product Name</th>
                <th className="table_th px-2 text-xs w-44">Code</th>
                <th className="table_th px-2 text-xs truncate text-center">
                  Quantity
                </th>
                <th className="table_th px-2 text-xs truncate text-center">
                  Price (PP)
                </th>
                <th className="table_th px-2 text-xs  truncate text-center">
                  Update Qty
                </th>
                <th className="table_th px-2 text-xs  truncate text-center">
                  Sub Total (-D)
                </th>

                <th className="table_th px-2 text-xs text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {grouped?.length > 0 ? (
                grouped?.map((group, group_index) =>
                  group?.data?.map((product, index) => {
                    const price = parseFloat(product?.price) || 0;

                    return (
                      <tr key={`${product.id}-${index}`} className="tbody_tr">
                        {index === 0 ? (
                          <td
                            className="table_th text-center w-4 text-xs"
                            rowSpan={group?.data?.length}
                          >
                            <p>{group_index + 1}</p>
                          </td>
                        ) : null}
                        {/* Product Name (only in first row of each group) */}
                        {index === 0 ? (
                          <td
                            className="table_th  text-xs max-w-28"
                            rowSpan={group?.data?.length}
                          >
                            <Tooltip content={group?.product} position="right">
                              <p> {truncateCharacters(group?.product, 20)}</p>
                            </Tooltip>
                          </td>
                        ) : null}

                        <td className="table_th px-2 text-xs text-center">
                          {product?.code}
                        </td>

                        <td className="table_th px-2 text-xs text-center">
                          {product?.quantity}
                        </td>
                        <td className="table_th px-2 text-xs text-center">
                          {product?.price}
                        </td>
                        <td className="table_th px-2 text-xs text-center">
                          <div className="flex items-center justify-center gap-x-3">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  product.originalIndex,
                                  "decrement"
                                )
                              }
                              className="border-[#26272F] border rounded-lg p-1 text-xl bg-[#19191F] w-14"
                            >
                              -
                            </button>
                            <div className="input_style w-16">
                              {product.quantity}
                            </div>
                            <button
                              onClick={() =>
                                handleUpdateQuantity(
                                  product.originalIndex,
                                  "increment"
                                )
                              }
                              className="border-[#26272F] border rounded-lg p-1 text-xl bg-[#19191F] w-14"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td className="table_th px-2 text-xs text-center">
                          {product?.subTotal?.toFixed(2)}
                        </td>
                        <td className=" px-2 text-end">
                          <div className="flex items-center justify-center gap-4">
                            <DeleteIcon
                              handleDelete={handleDeleteProduct}
                              item={index}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )
              ) : (
                <tr>
                  <td colSpan="10" className="bg-black-base text-center py-4">
                    <NotFound />
                  </td>
                </tr>
              )}
            </tbody>
            {/*  Footer for desktop */}
            {products?.length > 0 && (
              <tfoot className=" text-sm font-semibold bg-[#19191F]">
                <tr className="border-x border-b border-[#26272F]">
                  <td colSpan={2}></td>

                  <td className="py-3 pr-2 text-end text-gray-400">Total:</td>

                  <td className="table_th py-3 text-xs text-gray-300 text-center">
                    {totalQuantity}
                  </td>

                  <td className="table_th py-3 text-xs text-gray-300 text-center"></td>
                  <td></td>

                  <td className="py-3 table_th text-xs text-gray-300 text-center">
                    {totalSalePrice.toFixed(2)}
                  </td>

                  <td></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateProductForSale;
