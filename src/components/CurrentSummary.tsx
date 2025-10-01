"use client";
import { useSummaries } from "@/context/SummarizeContext";
import SummaryCard from "./SummaryCard";

function CurrentSummary() {
  const { currentSummary } = useSummaries();

  if (!currentSummary) return <div className="h-[30vh]"></div>;

  return (
    <div className="pt-10 max-w-[850px] max-h-[750px] mx-auto">
      {currentSummary && <SummaryCard data={currentSummary} />}
    </div>
  );
}

export default CurrentSummary;
