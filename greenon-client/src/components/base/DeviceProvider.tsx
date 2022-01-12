import React, { useEffect } from "react";
import useStore from "../../stores";

const DeviceProvider: React.FC = ({ children }) => {
  const { device } = useStore();

  useEffect(() => {
    device.load();
    window.addEventListener("resize", device.handleResize);
    return () => window.removeEventListener("resize", device.handleResize);
  }, [device]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default DeviceProvider;
