import { AUTH_KEY } from "@/constans/keys";
import { decodedToken } from "@/hooks/jwt";
import { instance as axiosInstance } from "@/helpers/axiosInstance";
import { getFromLocalStorage, setToLocalStorage } from "@/hooks/local-storage";

export const storeUserInfo = (accessToken) => {
  if (accessToken) {
    return;
  }
  return setToLocalStorage(AUTH_KEY, accessToken);
};
export const getUserInfo = (authToken) => {
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return {
      ...decodedData,
      //   role: decodedData?.role.toLowerCase(),
    };
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(AUTH_KEY);
  if (authToken) {
    return !!authToken;
  }
};

export const removeUser = () => {
  return setToLocalStorage(AUTH_KEY);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
