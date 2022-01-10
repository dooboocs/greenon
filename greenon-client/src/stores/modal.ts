import { observable } from "mobx";

export type ModalType =
  | "addDevice"
  | "sortDevice"
  | "controlDevice"
  | "controlMove"
  | "controlPower"
  | "controlMode"
  | "controlTime"
  | "controlOption"
  | "error";

interface Modal {
  type: ModalType;
  targetDeviceId: string;
  modalVisible: boolean;
  modalTitle: string;
  handleClose: () => void;
  handleOpen: (modal: ModalType) => void;
  setTargetDevice: (deviceId: string) => void;
}

export const modal = observable<Modal>({
  modalVisible: false,
  type: "addDevice",
  targetDeviceId: "",

  get modalTitle() {
    switch (this.type) {
      case "addDevice":
        return "확인사항";
      case "sortDevice":
        return "정렬";
      case "controlDevice":
        return "제품 전체 제어";
      case "controlMove":
        return "동작 제어";
      case "controlPower":
        return "전원";
      case "controlMode":
        return "모드";
      case "controlTime":
        return "시간";
      case "error":
        return "제품번호가 확인되지 않습니다";
      default:
        return "";
    }
  },
  handleClose() {
    this.modalVisible = false;
  },
  handleOpen(modal) {
    this.type = modal;
    this.modalVisible = true;
  },
  setTargetDevice(deviceId) {
    this.targetDeviceId = deviceId;
  },
});
