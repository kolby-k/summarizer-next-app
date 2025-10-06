import NewSummaryForm from "app/summarize/ui/NewSummaryForm";
import SessionInfo from "@/components/SessionInfo";
import TitleSection from "@/components/TitleSection";
import CurrentSummary from "./ui/CurrentSummary";

export default function Summarize() {
  return (
    <div className="page bg-texture bg-texture-dim">
      <TitleSection
        title="Summarize Any Article"
        subTitle="Get to the main ideas in seconds"
        actionButton={{ path: "/bookmarks", label: "Bookmarks" }}
        opts={{ smallTitle: true }}
      />
      <NewSummaryForm />

      <CurrentSummary />

      <SessionInfo />
    </div>
  );
}
