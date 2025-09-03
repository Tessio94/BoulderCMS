"use client";

import React, { useEffect, useRef } from "react";

const FrontendPagination = ({ page, setPage, totalPages, scrollTo }) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    scrollTo.current?.scrollIntoView({ behavior: "smooth" });
  }, [page]);

  return (
    <div className="mt-6 flex justify-center gap-3">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
        className="cursor-pointer rounded-lg border border-cyan-900 px-4 py-2 text-cyan-900 transition-all duration-300 hover:bg-cyan-900/50 disabled:pointer-events-none disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-4 py-2 text-cyan-900">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => setPage((p) => p + 1)}
        className="cursor-pointer rounded-lg border border-cyan-900 px-4 py-2 text-cyan-900 transition-all duration-300 hover:bg-cyan-900/50 disabled:pointer-events-none disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default FrontendPagination;
