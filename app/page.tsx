import DemoCard from "@/components/DemoCard";
import TitleSection from "@/components/TitleSection";

export default function Home() {
  return (
    <div className="page bg-texture">
      <TitleSection
        title="Summarize Any Article Instantly With AI"
        subTitle="Paste any link and get a clear, concise overview in seconds"
        actionButton={{ path: "/login", label: "Login" }}
      />

      <div className="flex flex-1 flex-wrap justify-evenly items-center p-2 gap-8 pt-20">
        <DemoCard />

        <span className="card">
          <h2 className="text-4xl text-center">How It Works</h2>
          <ol>
            <li>
              1. <span className="bold text-(--text-secondary)">Paste</span> a
              URL for any article.
            </li>
            <li>
              2. Click{" "}
              <span className="bold text-(--text-secondary) italic">
                Generate Summary
              </span>
              .
            </li>
            <li>
              3. <span className="bold text-(--text-secondary)">Read</span> a
              clear, concise overview with the{" "}
              <span className="bold text-(--text-secondary)">
                key takeaways
              </span>
              .
            </li>
          </ol>
        </span>
      </div>
    </div>
  );
}
