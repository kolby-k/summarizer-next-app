"use client";
import { useSummaries } from "@/context/SummarizeContext";
import SummaryCard from "@/components/SummaryCard";
import styles from "../summarize.module.css";

function CurrentSummary() {
  const { currentSummary } = useSummaries();

  if (!currentSummary) return null;

  return (
    <div className={styles.currentSummaryWrapper}>
      {currentSummary && <SummaryCard data={currentSummary} />}
    </div>
  );
}

export default CurrentSummary;
