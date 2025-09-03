"use client";

import { useProjectInfo } from "@/context/ProjectContext";
import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const Spinner = () => {
  const { showSpinner, setShowSpinner } = useProjectInfo();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // console.log("searchParams", searchParams);
  // console.log(pathname);
  useEffect(() => {
    const handleLoad = () => setTimeout(() => setShowSpinner(false), 300);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);

      return () => window.removeEventListener("load", handleLoad);
    }
  }, [pathname, searchParams]);

  return (
    <div className={cn("preloader", showSpinner ? "" : "preloader-hide")}>
      <div className="loader">
        <div className="ytp-spinner">
          <div className="ytp-spinner-container">
            <div className="ytp-spinner-rotator">
              <div className="ytp-spinner-left">
                <div className="ytp-spinner-circle"></div>
              </div>
              <div className="ytp-spinner-right">
                <div className="ytp-spinner-circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
