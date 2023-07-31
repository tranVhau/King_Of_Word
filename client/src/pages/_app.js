import "@/styles/globals.css";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { AppContextProvider } from "../context/context";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", () => {
        localStorage.removeItem("isAd");
      });
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", () => {
          localStorage.removeItem("isAd");
        });
      }
    };
  }, []);
  return (
    <AppContextProvider>
      <Provider store={store}>
        <Component {...pageProps} />
        <Toaster />
      </Provider>
    </AppContextProvider>
  );
}
