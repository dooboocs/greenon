import React, { useEffect } from "react";
import useStore from "../../stores";

const DeviceProvider: React.FC = ({ children }) => {
  const { user, device, etc } = useStore();

  useEffect(() => {
    user.getUser();
    device.load();
    etc.init();

    window.addEventListener("resize", device.handleResize);
    return () => window.removeEventListener("resize", device.handleResize);
  }, [user, device, etc]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default DeviceProvider;
