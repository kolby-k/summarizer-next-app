import type { Summary } from "@/context/SummarizeContext";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

function ModalSummary({
  data,
  onClose,
}: {
  data: Summary;
  onClose: () => void;
}) {
  const { title, id, url, createdAt, summary, bias } = data;
  const [activeScreen, setActiveScreen] = useState<1 | 2>(1);
  if (!data || !id) return null;

  const displayDate = new Date(createdAt).toDateString();

  return (
    <div className="summary-modal-container">
      <IoMdClose className="close-modal-icon" onClick={onClose} />
      <div className="summary-top-row">
        <h3>{title}</h3>
        <a href={url} target="_blank">
          {url}
        </a>
        <p>Summarized on: {displayDate}</p>
      </div>
      <div className="active-section-buttons">
        <span
          className={`section-toggle ${activeScreen === 1 && "active-toggle"}`}
          onClick={() => setActiveScreen(1)}
        >
          <h6>Summary</h6>
        </span>
        <span
          className={`section-toggle ${activeScreen === 2 && "active-toggle"}`}
          onClick={() => setActiveScreen(2)}
        >
          <h6>Bias</h6>
        </span>
      </div>
      {activeScreen === 1 && (
        <div className="modal-active-section">{summary}</div>
      )}
      {activeScreen === 2 && <div className="modal-active-section">{bias}</div>}
    </div>
  );
}

export default ModalSummary;
