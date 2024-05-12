import { useEffect } from "react";

const useOnResize = () => {
  useEffect(() => {
    const onResize = () => location.reload();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  });
};

export default useOnResize;
