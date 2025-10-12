import React from "react";

function Loader({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;

  return (
    <div className="z-50 absolute inset-0 grid place-items-center bg-black/40 backdrop-blur overflow-hidden pointer-events-auto">
      <div className="rounded-xl p-4 font-semibold text-lg bg-(--bg-light) text-(--text) border border-(--highlight)">
        Loading ...
      </div>
    </div>
  );
}

export default Loader;
