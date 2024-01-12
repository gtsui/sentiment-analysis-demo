"use client";

import { ToastContainer, toast, Theme, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// DOCUMENTATION: https://fkhadra.github.io/react-toastify/introduction

type Options = {
  position?: ToastPosition;
  theme?: Theme;
  autoClose?: number;
};

type ToastType = "info" | "error" | "success";

export const emitToast = (
  msg: string,
  toastType: ToastType,
  options?: Options
) => {
  const opts = {
    position: options?.position ?? "bottom-center",
    autoClose: options?.autoClose ?? 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: options?.theme ?? "light",
  };
  if (toastType === "info") {
    toast.info(msg, opts);
  } else if (toastType === "error") {
    toast.error(msg, opts);
  } else {
    toast.success(msg, opts);
  }
};

const Toast = () => {
  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover={false}
      draggable={false}
      theme="light"
    />
  );
};

export default Toast;
