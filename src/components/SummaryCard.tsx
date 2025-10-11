"use client";

import { Summary, useSummaries } from "../context/SummarizeContext";
import CustomButton from "./CustomButton";

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
      <h5>{title}</h5>
      <div className="text-container">
        <h6>Summary</h6>
        <p className="text-left">{summary}</p>
      </div>
      <div className="w-full h-[50px]">
        <CustomButton
          title={isBookmarked ? "Remove Bookmark" : "Bookmark"}
          onClick={toggleBookmark}
          variant={isBookmarked ? "secondary" : "primary"}
          styles="max-w-1/2"
        />
        <CustomButton
          title="View More"
          onClick={handleShowModal}
          variant="primary"
          styles="max-w-1/2"
        />
      </div>
    </div>
  );
}

export default SummaryCard;
