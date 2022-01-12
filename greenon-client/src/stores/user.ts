import { observable } from "mobx";
import { apis } from "../lib/axios";

interface IUser {
  email: string;
  name: string;
  phone: string;
  getUser: () => void;
}

export const user = observable<IUser>({
  email: "",
  name: "",
  phone: "",
  getUser() {
    apis.getUserInfo().then((res) => {
      if (res) {
        this.email = res.data.email;
        this.name = res.data.name;
        this.phone = res.data.phone;
      }
    });
  },
});
