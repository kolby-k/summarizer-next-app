"use client";
import { useSummaries } from "@/context/SummarizeContext";
import SummaryCard from "@/components/SummaryCard";
import styles from "../summarize.module.css";

function CurrentSummary() {
  const { currentSummary } = useSummaries();
  // console.log(currentSummary);

  if (!currentSummary) return null;

  return (
    <div className={styles.currentSummaryWrapper}>
      {currentSummary && <SummaryCard data={currentSummary} />}
    </div>
  );
}

export default CurrentSummary;

// var mock = {
//   summary:
//     "The Montreal Canadiens are entering the 2025-26 NHL season with heightened expectations following a strong finish last year. Their young core, including forwards Cole Caufield, Nick Suzuki, Brendan Gallagher, and Patrik Laine, all of whom scored over 20 goals last season, is expected to lead the team. The addition of defenseman Noah Dobson aims to bolster the defense, while rookie forward Ivan Demidov is anticipated to make an impact. The team's success will depend on maintaining their late-season performance over the full 82-game schedule.The article appears to be objective, providing a balanced overview of the Canadiens' prospects without showing evident bias.The Montreal Canadiens are entering the 2025-26 NHL season with heightened expectations following a strong finish last year. Their young core, including forwards Cole Caufield, Nick Suzuki, Brendan Gallagher, and Patrik Laine, all of whom scored over 20 goals last season, is expected to lead the team. The addition of defenseman Noah Dobson aims to bolster the defense, while rookie forward Ivan Demidov is anticipated to make an impact. ",
//   bias: "The article appears to be objective, providing a balanced overview of the Canadiens' prospects without showing evident bias.",
//   title:
//     "Montreal Canadiens' Young Core and New Additions Raise Playoff Hopes for 2025-26 Season",
//   id: "70902e07-e0f6-4a53-8749-f7a4faf54e2a",
//   url: "https://www.nhl.com/news/topic/season-previews/montreal-canadiens-season-preview-2025-26",
//   createdAt: 1760105525894,
// };
