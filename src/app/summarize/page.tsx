import NewSummaryForm from "../../components/NewSummaryForm";
import SessionInfo from "../../components/SessionInfo";
import TitleSection from "../../components/TitleSection";
import CurrentSummary from "@/components/CurrentSummary";

export default function Summarize() {
  return (
    <div className="fitted-page">
      <TitleSection
        title="Summarize Any Online Article"
        subTitle="Save time and get to the main ideas."
        actionButton={{ path: "/bookmarks", label: "Bookmarks" }}
      />
      <NewSummaryForm />
      <div className="w-[90vw] min-h-[1/2vh] mx-auto">
        <CurrentSummary />
      </div>
      <SessionInfo />
    </div>
  );
}
