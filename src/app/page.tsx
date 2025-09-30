import DemoCard from "@/components/DemoCard";
import TitleSection from "@/components/TitleSection";

export default function Home() {
  return (
    <div className="page">
      <TitleSection
        title="Summarize Any Article Instantly With AI"
        subTitle="Paste a link, click summarize, and get a clear, concise overview of
          any article."
        actionButton={{ path: "/login", label: "Login" }}
      />

      <div className="flex flex-1 justify-between items-center pt-20">
        <div className="flex flex-1 justify-center items-center">
          <DemoCard />
        </div>

        <div className="flex flex-1  justify-center items-center">
          <span className="font-semibold text-left p-2">
            <p className="text-4xl pb-6">How It Works:</p>
            <ol className="flex flex-col items-start pl-2 text-2xl gap-2">
              <li>1. Paste a link to an article.</li>
              <li>2. Click 'Generate Summary'.</li>
              <li>3. Read a clear, concise overview with the key takeaways.</li>
            </ol>
          </span>
        </div>
      </div>
    </div>
  );
}
