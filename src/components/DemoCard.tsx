import React from "react";

function DemoCard() {
  return (
    <div className="flex flex-col h-full gap-10 w-full justify-around items-center">
      <div className="hero">
        <h3>Fast & Simple</h3>
        <h4>Paste any link and get a clear summary in seconds</h4>
      </div>

      <div className="how-it-works">
        <h3>How It Works</h3>
        <ol className="flex flex-col text-left ml-10 flex-wrap">
          <li>
            1. <span className="bold text-(--text)">Paste</span> a URL for any
            article.
          </li>
          <li>
            2. Click{" "}
            <span className="bold text-(--text) italic">Generate Summary</span>.
          </li>
          <li>
            3. <span className="bold text-(--text)">Read</span> a clear, concise
            overview with the{" "}
            <span className="bold text-(--text)">key takeaways</span>.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default DemoCard;
