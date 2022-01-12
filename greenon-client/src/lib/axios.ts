import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

const openApiKey =
  "vhW6t1NUD9mHxCudrfOCzpcz5AzHQRkaRBEirN%2BrbSzRZLy6UT2joVXJ0s%2FB1ARUDnsAJg7xqNOfBGXU3FZ3gA%3D%3D";

export const apis = {
  login: async (email: string, password: string) =>
    instance.post("/auth/login", {
      email,
      password,
    }),
  kakaoLogin: async () => instance.get("/auth/kakao"),
  getUserInfo: async () =>
    instance.get("/users/detail", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }),
  getDevices: () =>
    instance.get("/devices", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }),
  getDevice: (id: string) => {
    instance.get(`/devices/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  },
  updateDevice: (device_id: string, field: any) => {
    instance.put(`/devices/${device_id}`, field, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  },
  deleteDevice: (device_id: string) => {
    instance.delete(`/devices/${device_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  },
  getLocation: () =>
    axios.get(
      `https://api.bigdatacloud.net/data/ip-geolocation?localityLanguage=ko&key=c8702a97debe47f2afba794def1d2b09`
    ),
  getFindDust: () =>
    axios.get(
      `https://cors-anywhere.herokuapp.com/http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?serviceKey=${openApiKey}&returnType=json&numOfRows=1&sidoName=전국&ver=1.0`
    ),
};
