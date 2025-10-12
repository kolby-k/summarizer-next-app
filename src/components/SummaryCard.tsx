"use client";

import { Summary, useSummaries } from "../context/SummarizeContext";
import CustomButton from "./CustomButton";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";

export interface SummaryCardProps {
  data: Summary;
  handleShowModal?: () => void;
}

function SummaryCard({ data, handleShowModal }: SummaryCardProps) {
  const { summary, id, title } = data;

  const { bookmarks, addBookmark, removeBookmark } = useSummaries();
  const isBookmarked = bookmarks.filter((b) => b.id === id).length === 1;

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(id);
    } else {
      addBookmark(data);
    }
  };

  return (
    <div className="summary-card">
      <span id="bookmark-icon" onClick={toggleBookmark}>
        {isBookmarked ? (
          <FaBookmark className="active-bm" />
        ) : (
          <FaRegBookmark />
        )}
      </span>
      <h3>{title}</h3>
      <div className="text-container">
        <h5>Summary</h5>
        <p className="line-clamp-12 md:line-clamp-8 clamp-fade">{summary}</p>
      </div>
      <div className="summary-buttons">
        <CustomButton
          title="View More"
          onClick={handleShowModal}
          variant="primary"
          styles="max-w-2/3"
        />
      </div>
    </div>
  );
}

export default SummaryCard;
