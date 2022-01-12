import { device } from "./device";
import { modal } from "./modal";
import { etc } from "./etc";
import { user } from "./user";

const useStore = () => {
  return { user, device, modal, etc };
};

export default useStore;
