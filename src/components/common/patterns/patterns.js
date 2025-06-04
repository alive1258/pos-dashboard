export const phoneNumberPattern = {
  value: /^[0-9]{11}$/, // Only allow exactly 10 digits
  message: "Phone number must be 11 digits",
};

export const numberPattern = {
  value: /^\d+(\.\d+)?$/,
  message: "Please enter a valid decimal number",
};

export const passwordPattern = {
  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
  message:
    "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character",
};
