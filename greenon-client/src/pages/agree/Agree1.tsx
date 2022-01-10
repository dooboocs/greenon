import React from "react";
import { AuthDynamicModal } from "../../components/auth";
import { PageTemplate } from "../../components/base";

const Agree1 = () => {
  const [isPc, setIsPc] = React.useState(false);

  React.useEffect(() => {
    function onResize() {
      setIsPc(window.innerWidth > 540);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isPc ? (
    <PageTemplate headerTitle="약관 동의">이용약관</PageTemplate>
  ) : (
    <AuthDynamicModal headerTitle="약관 동의">이용약관</AuthDynamicModal>
  );
};

export default Agree1;
