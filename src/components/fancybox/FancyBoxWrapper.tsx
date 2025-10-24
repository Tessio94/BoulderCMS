// components/FancyboxWrapper.jsx
"use client";

import { ReactNode, useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function FancyboxWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    NativeFancybox.bind("[data-fancybox]", {});
    return () => {
      NativeFancybox.destroy();
    };
  }, []);

  return children;
}
