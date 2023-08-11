import Swal from "sweetalert2";
import styles from "./swal.module.css";

export const SwalModal = Swal.mixin({
  customClass: `${styles.swal}`,
});

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

export const successModal = (title, text) => {
  SwalModal.fire({
    title: title,
    text: text,
    icon: "success",
  });
};

export const errorModal = (title, text) => {
  SwalModal.fire({
    title: title,
    text: text,
    icon: "error",
  });
};

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
