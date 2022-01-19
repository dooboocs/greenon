import { observable, toJS } from "mobx";
import { apis } from "../lib/axios";
import { app } from "./app";

export interface IDevice {
  id: string;
  title: string;
  name: string;
  device_type: string;
  power: boolean;
  mode: number;
  mode_time: string;
  motion_control: boolean;
  space_sterilization: string;
  pest_control: string;
  water_level: string;
  medicine: string;
  device_data: IDeviceData[];
}

export interface IDeviceData {
  bio_air_roll: number;
  air_quailty: number;
  find_dust: number;
  food_poisoning: number;
  humedity: number;
  temperature: number;
  created_at: Date;
}

export interface IDeviceStore {
  devices: IDevice[] | [];
  pageData: IDevice[];
  offset: number;
  page: number;
  numPage: number;
  loading: boolean;

  init: () => void;
  updateDevice: (id: string, key: string, value: any) => void;
  updateAllDevice: (key: string, value: any) => void;
  deleteDevice: (id: string) => void;
  setPage: (page: number) => void;
}

export const device = observable<IDeviceStore>({
  // Observable
  devices: [],
  offset: 6,
  page: 0,
  numPage: 1,
  loading: false,

  // Computed
  get pageData() {
    let start = this.page * this.offset;
    let end = start + this.offset;

    return toJS(this.devices).slice(start, end);
  },
  // Action
  async init() {
    await apis.getDevices().then((res) => {
      this.devices = res.data;
    });

    // loading delay
    app.delayedLoading(false);
  },
  async updateDevice(id, key, value) {
    await apis.updateDevice(id, { [key]: value });
    this.devices = toJS(this.devices).map((device) =>
      device.id === id ? { ...device, [key]: value } : device
    );
    app.delayedLoading(true);
  },
  async updateAllDevice(key, value) {
    await apis.updateAllDevice({ [key]: value });
    this.devices = toJS(this.devices).map((device) => ({
      ...device,
      [key]: value,
    }));

    app.delayedLoading(true);
  },
  async deleteDevice(id) {
    await apis.deleteDevice(id);
    this.devices = toJS(this.devices).filter((device: any) =>
      device.id === id ? false : device
    );
  },
  setPage(page) {
    this.page = page;
  },
});
