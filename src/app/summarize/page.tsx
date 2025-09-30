import NewSummaryForm from "../../components/NewSummaryForm";
import SessionInfo from "../../components/SessionInfo";
import TitleSection from "../../components/TitleSection";

export default function Summarize() {
  return (
    <div className="page">
      <TitleSection
        title="Summarize Any Online Article"
        subTitle="Save time and get to the main ideas."
        actionButton={{ path: "/bookmarks", label: "Bookmarks" }}
      />
      <NewSummaryForm />
      <SessionInfo />
    </div>
  );
}
