import { calculateDiscount } from "@/utils/calculateDiscount";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  selectedItems: 0,
  subTotal: 0,
  discount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add product to cart
    // Add product to cart
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const attribute_ids = action.payload?.attribute_ids;
      const variant_ids = action.payload?.variant_ids;

      const existingProduct = state.products.find((product) => {
        const isSameProduct = product.id === id;

        return isSameProduct;
      });

      if (existingProduct) {
        existingProduct.quantity += parseInt(quantity) || 1;
      } else {
        state.products.push({
          ...action.payload,
          quantity: parseInt(quantity) || 1,
        });
      }

      updateCartState(state);
    },

    updatedQuantity: (state, action) => {
      const { product: productData, type, value } = action.payload;
      const id = productData.id;

      const product = state.products.find((p) => {
        const isSameProduct = p.id === id;

        return isSameProduct;
      });

      if (product) {
        if (type === "increment") {
          product.quantity += 1;
          product.serials = action.payload.serials;
          const discount = calculateDiscount(
            product.discountType,
            product.discountValue,
            product.unit_price,
            product.quantity
          );

          product.subTotal = product.unit_price * product.quantity - discount;
          product.discount = discount;
        } else if (type === "decrement" && product.quantity > 1) {
          product.quantity -= 1;
          product.serials = action.payload.serials;

          const discount = calculateDiscount(
            product.discountType,
            product.discountValue,
            product.unit_price,
            product.quantity
          );

          product.subTotal = product.unit_price * product.quantity - discount;
          product.discount = discount;
        } else if (type === "set") {
          product.quantity = parseInt(value) || "";

          const discount = calculateDiscount(
            product.discountType,
            product.discountValue,
            product.unit_price,
            product.quantity
          );
          product.subTotal = product.unit_price * product.quantity - discount;
          product.discount = discount;
        }

        // Recalculate product subtotal
        product.subTotal =
          product.unit_price * product.quantity -
          (product.discountType === "percentage"
            ? (product.unit_price * product.discount * product.quantity) / 100
            : product.discount);

        // Recalculate the cart total price
        state.totalPrice = state.products.reduce(
          (total, p) => total + p.subTotal,
          0
        );
      }
    },

    setDiscount: (state, action) => {
      state.discount = action.payload;
      updateCartState(state);
    },

    removeFromCart: (state, action) => {
      const { id } = action.payload;

      state.products = state.products.filter((product) => {
        const isSameProduct = product.id === id;

        return !isSameProduct;
      });

      // Recalculate the cart total price
      state.totalPrice = state.products.reduce(
        (total, p) => total + p.subTotal,
        0
      );
    },
    clearCart: (state) => {
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
const updateCartState = (state) => {
  state.selectedItems = state.products.reduce(
    (total, product) => total + product.quantity,
    0
  );
  state.totalPrice = calculateTotalPrice(state.products);
};

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updatedQuantity,
  setDiscount,
} = cartSlice.actions;
export default cartSlice.reducer;
