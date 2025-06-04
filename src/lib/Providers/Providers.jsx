"use client";

import { persistor, store } from "@/redux/store";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";

const Providers = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true); // Set to true once the app is mounted on the client
  }, []);

  if (!isHydrated) {
    return <div>Loading...</div>; // Show a loading state until client hydration is complete
  }
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </>
  );
};

export default Providers;
