import { observable } from "mobx";

interface IToast {
  open: boolean;
  message: string;

  openToast: (message: string) => void;
}

export const toast = observable<IToast>({
  open: false,
  message: "",

  openToast(message) {
    this.open = true;
    this.message = message;

    setTimeout(() => {
      this.open = false;
    }, 2000);
  },
});
