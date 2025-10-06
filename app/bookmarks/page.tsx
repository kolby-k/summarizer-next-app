import BookmarkList from "app/bookmarks/ui/BookmarkList";
import TitleSection from "@/components/TitleSection";

export default async function Bookmarks() {
  return (
    <div className="page bg-texture">
      <TitleSection
        title="Your Saved Summaries"
        subTitle="Keep track of your summarized articles in one place."
        actionButton={{ path: "/summarize", label: "Back" }}
        opts={{ smallTitle: true }}
      />
      <BookmarkList />
    </div>
  );
}
