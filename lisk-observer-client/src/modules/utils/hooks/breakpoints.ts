import { useState, useEffect } from "react";

const getDeviceConfig = (width: number) => {
  if (width < 320) {
    return "xs";
  } else if (width >= 320 && width < 720) {
    return "sm";
  } else if (width >= 720 && width < 1024) {
    return "md";
  } else if (width >= 1024) {
    return "lg";
  }
};

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(() =>
    getDeviceConfig(window.innerWidth)
  );
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const calcInnerWidth = () => {
      setWidth(window.innerWidth || 0);
      setBreakpoint(getDeviceConfig(window.innerWidth));
    };
    window.addEventListener("resize", calcInnerWidth);
    return () => window.removeEventListener("resize", calcInnerWidth);
  }, []);

  return { breakpoint, width };
};

export default useBreakpoint;
