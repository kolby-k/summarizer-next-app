import React from "react";

function HowItWorks() {
  return (
    <span className="how-it-works">
      <h2 className="text-4xl text-center">How It Works</h2>
      <ol>
        <li>
          1. <span className="bold text-(--text-secondary)">Paste</span> a URL
          for any article.
        </li>
        <li>
          2. Click{" "}
          <span className="bold text-(--text-secondary) italic">
            Generate Summary
          </span>
          .
        </li>
        <li>
          3. <span className="bold text-(--text-secondary)">Read</span> a clear,
          concise overview with the{" "}
          <span className="bold text-(--text-secondary)">key takeaways</span>.
        </li>
      </ol>
    </span>
  );
}

export default HowItWorks;
