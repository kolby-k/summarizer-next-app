import React from "react";

function Loader({
  isLoading,
  overlay = false,
}: {
  isLoading: boolean;
  overlay?: boolean;
}) {
  if (!isLoading) return null;

  if (overlay) {
    return (
      <div className="loading-overlay">
        <div className="loader-animated-container">
          <div className="loader-animated"></div>
          <p>Loading ..</p>
        </div>
      </div>
    );
  }

  return (
    <div className="loader-animated-container">
      <div className="loader-animated"></div>
      <p>Loading ..</p>
    </div>
  );
}

export default Loader;
