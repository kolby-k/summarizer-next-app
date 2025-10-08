import NewSummaryForm from "app/summarize/ui/NewSummaryForm";
import SessionInfo from "app/summarize/ui/SessionInfo";
import TitleSection from "@/components/TitleSection";
import CurrentSummary from "./ui/CurrentSummary";
import styles from "./summarize.module.css";

export default function Summarize() {
  return (
    <div className={styles.page}>
      <TitleSection
        title="Summarize Any Article"
        subTitle="Get to the main ideas in seconds"
        actionButton={{ path: "/bookmarks", label: "Bookmarks" }}
      />

      <NewSummaryForm />
      <CurrentSummary />

      <SessionInfo />
    </div>
  );
}
