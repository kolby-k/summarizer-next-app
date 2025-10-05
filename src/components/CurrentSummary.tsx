"use client";
import { useSummaries } from "@/context/SummarizeContext";
import SummaryCard from "./SummaryCard";

function CurrentSummary() {
  const { currentSummary } = useSummaries();

  if (!currentSummary) return <div className="spacer"></div>;

  return (
    <div className="pt-6 mx-auto h-[650px]">
      {currentSummary && <SummaryCard data={currentSummary} />}
    </div>
  );
}

export default CurrentSummary;
