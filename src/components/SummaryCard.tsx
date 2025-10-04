"use client";

import { Summary, useSummaries } from "../context/SummarizeContext";

export interface SummaryCardProps {
  data: Summary;
}

function SummaryCard({ data }: SummaryCardProps) {
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
    <div className="card summary-card">
      <h5>{title}</h5>
      <div className="text-container">
        <h6>Summary</h6>
        <p className="text-left">{summary}</p>
      </div>
      <button className="button-two" onClick={toggleBookmark}>
        {isBookmarked ? "Remove Bookmark" : "Bookmark"}
      </button>
    </div>
  );
}

export default SummaryCard;
