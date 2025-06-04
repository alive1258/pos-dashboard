export const calculateDiscount = (
  discountType,
  discountValue,
  unitPrice,
  quantity
) => {
  if (discountType?.id === 1) {
    return Number(discountValue * quantity) ?? 0;
  } else if (discountType?.id === 2) {
    return Number((Number(discountValue) ?? 0) / 100) * unitPrice * quantity;
  }
  return 0;
};
