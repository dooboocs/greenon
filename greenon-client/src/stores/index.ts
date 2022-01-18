import { device } from "./device";
import { modal } from "./modal";
import { etc } from "./etc";
import { user } from "./user";
import { toast } from "./toast";
import { app } from "./app";

const useStore = () => {
  return { user, device, modal, etc, toast, app };
};

export default useStore;
