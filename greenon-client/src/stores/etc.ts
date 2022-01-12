import { observable } from "mobx";
import { apis } from "../lib/axios";

interface IEtc {
  location: string;
  weather: string;
  find_dust: string;
  fetchLocation: () => void;
  getFindDust: () => void;
  init: () => void;
}

export const etc = observable<IEtc>({
  location: "서울시 강남구",
  weather: "맑음",
  find_dust: "2.5PM",

  init() {
    this.fetchLocation();
    this.getFindDust();
  },
  fetchLocation() {
    apis.getLocation().then((res) => {
      if (res) {
        this.location = `${res.data.location.city} ${res.data.location.localityName}`;
      }
    });
  },
  getFindDust() {
    apis.getFindDust().then((res) => {
      if (res) {
        console.log(res);
        this.find_dust = "2.5PM";
      }
    });
  },
});
