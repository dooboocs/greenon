import { observable } from "mobx";
import { toast } from "./toast";

function delay(ms: number) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(1);
    }, ms)
  );
}

export const app = observable({
  loading: true,
  updateLoading: false,

  async delayedLoading(update?: boolean, ms: number = 1000): Promise<any> {
    if (update) {
      this.updateLoading = true;
      await delay(ms).then(() => {
        this.updateLoading = false;
        toast.openToast("성공적으로 반영되었습니다.");
      });
    } else {
      this.loading = true;
      await delay(ms).then(() => {
        this.loading = false;
      });
    }
  },
});
