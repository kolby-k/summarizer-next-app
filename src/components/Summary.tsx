import type { Summary } from "@/context/SummarizeContext";

function Summary({ data }: { data: Summary }) {
  const { title, id, url, createdAt, summary, bias } = data;
  if (!data || !id) return null;
  const displayDate = new Date(createdAt).toString();

  return (
    <div className="summary-card-container">
      <div className="summary-meta-row">
        <h3>{title}</h3>
        <a href={url} target="_blank">
          {url}
        </a>
        <p>Summarized on: {displayDate}</p>
      </div>
      <div className="summary-column grid-col-cell">
        <h6>Summary</h6>
        <p className="clamp-3">{summary}</p>
      </div>

      <div className="bias-column grid-col-cell">
        <h6>Bias</h6>
        <p className="clamp-3">{bias}</p>
      </div>
    </div>
  );
}

export default Summary;
