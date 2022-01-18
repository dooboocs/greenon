import axios from "axios";

export const instance = axios.create({
  baseURL: "http://52.79.146.233:3000",
});

export const apis = {
  login: async (email: string, password: string) =>
    instance.post("/auth/login", {
      email,
      password,
    }),
  register: async (email: string, password: string) =>
    instance.post("/auth/register", {
      email,
      password,
    }),
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
  updateAllDevice: (field: any) => {
    instance.put("/devices", field, {
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
  createRequest: (inputs: any) =>
    axios({
      method: "POST",
      url: "http://52.79.146.233:3000/requests",
      data: inputs,
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getNotices: () => instance.get("/notices"),
};
