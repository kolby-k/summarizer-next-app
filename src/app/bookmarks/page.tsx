import BookmarkList from "../../components/BookmarkList";
import TitleSection from "../../components/TitleSection";

export default async function Bookmarks() {
  return (
    <div className="page">
      <TitleSection
        title="Your Saved Article Summaries"
        subTitle="Keep track of your summarized articles in one place."
        actionButton={{ path: "/summarize", label: "Back" }}
      />
      <BookmarkList />
    </div>
  );
}
