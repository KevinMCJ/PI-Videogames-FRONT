import Swal from "sweetalert2";
import styles from "./toast.module.css";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  customClass: `${styles.toast}`,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const successToast = (message) => {
  Toast.fire({
    icon: "success",
    title: message,
  });
};

export const errorToast = (message) => {
  Toast.fire({
    icon: "error",
    title: message,
  });
};
