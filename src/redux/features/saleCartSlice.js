import { calculateDiscount } from "@/utils/calculateDiscount";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedItems: 0,
  subTotal: 0,
  discount: 0,
  totalPrice: 0,
};

const saleCartSlice = createSlice({
  name: "saleCart",
  initialState,
  reducers: {
    // Add product to cart
    addToCartSale: (state, action) => {
      let existingProduct = null;

      existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (!existingProduct) {
        state.products.push({
          ...action.payload,
          quantity: parseInt(action.payload.quantity) || 1,
        });
      }
      console.log(action.payload, "action.payload");
      updateSaleCartState(state);
    },

    updatedSaleQuantity: (state, action) => {
      const { index, type, value } = action.payload;
      const product = state.products.find(
        (_, indexNumber) => indexNumber === index
      );

      if (product) {
        if (type === "increment") {
          //update quantity and serial
          product.quantity += 1;
          product.serials = action.payload.serials;

          // calculate discount
          const discount = calculateDiscount(
            product.discountType,
            product.discountValue,
            product.price,
            product.quantity
          );

          // set subtotal and discount
          const sub_total =
            parseFloat(product.price) * parseFloat(product.quantity) -
            parseFloat(discount);
          product.subTotal = sub_total;

          product.discount = discount;
        } else if (type === "decrement" && product.quantity > 1) {
          //update quantity and serial
          product.quantity -= 1;
          product.serials = action.payload.serials;

          // calculate discount
          const discount = calculateDiscount(
            product.discountType,
            product.discountValue,
            product.price,
            product.quantity
          );

          // set subtotal and discount
          product.subTotal =
            parseFloat(product.price) * parseFloat(product.quantity) -
            parseFloat(discount);
          product.discount = discount;
        } else if (type === "set") {
          //update quantity
          product.quantity = parseInt(value) || "";

          // calculate discount
          const discount = calculateDiscount(
            product.discountType,
            product.discountValue,
            product.price,
            product.quantity
          );

          // set subtotal and discount
          product.subTotal =
            parseFloat(product.price) * parseFloat(product.quantity) -
            parseFloat(discount);
          product.discount = discount;
        }

        // Recalculate product subtotal
        product.subTotal =
          parseFloat(product.price) * parseFloat(product.quantity) -
          (product.discountType === "percentage"
            ? (parseFloat(product.price) *
                parseFloat(product.discount) *
                parseFloat(product.quantity)) /
              100
            : parseFloat(product.discount));

        // Recalculate the cart total price
        state.totalPrice = state.products.reduce(
          (total, p) => total + p.subTotal,
          0
        );
      }
    },

    setSaleDiscount: (state, action) => {
      state.discount = action.payload;
      updateSaleCartState(state);
    },
    removeFromSaleCart: (state, action) => {
      state.products = state.products.filter(
        (_, index) => index !== action.payload.index
      );

      // Recalculate the cart total price
      state.totalPrice = state.products.reduce(
        (total, p) => total + p.subTotal,
        0
      );
      updateSaleCartState(state);
    },

    clearSaleCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.subTotal = 0;
      state.discount = 0;
      state.totalPrice = 0;
    },
  },
});

const calculateTotalPrice = (products) => {
  return products.reduce((total, product) => {
    const productDiscountPrice = calculateDiscount(
      product.price,
      product.discount
    );
    return total + product.quantity * productDiscountPrice;
  }, 0);
};

// Function to update the state of the cart
const updateSaleCartState = (state) => {
  // state.selectedItems = state.products.reduce(
  //   (total, product) => total + product.quantity,
  //   0
  // );
  // state.totalPrice = calculateTotalPrice(state.products);
};

export const {
  addToCartSale,
  removeFromSaleCart,
  clearSaleCart,
  updatedSaleQuantity,
  setSaleDiscount,
} = saleCartSlice.actions;
export default saleCartSlice.reducer;
