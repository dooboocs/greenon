import React, { useState, useEffect } from "react";
import { Alert, Snackbar, SnackbarOrigin } from "@mui/material";
import useStore from "../../stores";
import { useObserver } from "mobx-react";

const Toast = () => {
  const [origin, setOrigin] = useState<SnackbarOrigin>({
    vertical: "bottom",
    horizontal: "right",
  });
  const { toast } = useStore();

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setOrigin({ vertical: "top", horizontal: "center" });
    } else {
      setOrigin({ vertical: "bottom", horizontal: "right" });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return useObserver(() => (
    <Snackbar
      open={toast.open}
      anchorOrigin={{
        vertical: origin.vertical,
        horizontal: origin.horizontal,
      }}
    >
      <Alert severity="info">{toast.message}</Alert>
    </Snackbar>
  ));
};

export default Toast;
