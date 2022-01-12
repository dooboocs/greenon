import axios from "axios";

export const instance = axios.create({
  baseURL: "http://192.168.0.68:3000/",
});

export const apis = {
  login: async (email: string, password: string) =>
    instance.post("/login", {
      email,
      password,
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
};
