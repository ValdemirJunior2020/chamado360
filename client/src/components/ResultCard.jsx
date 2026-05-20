// client/src/components/ResultCard.jsx
const splitMarkdown = (text) => {
  if (!text) return [];
  return text
    .split(/(?=^##\s)/gm)
    .map((section) => section.trim())
    .filter(Boolean);
};

const cleanHeading = (section) => {
  const lines = section.split("\n");
  const first = lines[0] || "";
  const title = first.replace(/^#+\s*/, "").trim();
  const body = lines.slice(1).join("\n").trim();
  return { title, body };
};

export default function ResultCard({ result }) {
  const sections = splitMarkdown(result);

  return (
    <div className="result-grid">
      {sections.map((section, index) => {
        const { title, body } = cleanHeading(section);
        const isMainTitle = section.startsWith("# ");

        return (
          <article key={`${title}-${index}`} className={`result-card card-premium ${isMainTitle ? "result-main-title" : ""}`}>
            <h2>{title}</h2>
            <div className="result-body">
              {body.split("\n").map((line, lineIndex) => {
                const trimmed = line.trim();
                if (!trimmed) return <br key={lineIndex} />;
                if (trimmed.startsWith("- ")) return <p key={lineIndex} className="result-bullet">• {trimmed.slice(2)}</p>;
                if (/^\d+\./.test(trimmed)) return <p key={lineIndex} className="result-number"><strong>{trimmed}</strong></p>;
                return <p key={lineIndex}>{trimmed}</p>;
              })}
            </div>
          </article>
        );
      })}
    </div>
  );
}
