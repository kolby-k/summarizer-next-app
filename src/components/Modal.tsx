import React from "react";

function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="modal-wrapper">
      <div className="modal">{children}</div>
    </div>
  );
}

export default Modal;
