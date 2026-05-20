// client/src/components/QuestionCard.jsx
export default function QuestionCard({ question, value, onChange, label, index, total }) {
  return (
    <div className="question-card card-premium">
      <div className="question-pill">{label} {index + 1} / {total}</div>
      <h2 className="question-title">{question}</h2>
      <textarea
        className="form-control answer-box"
        rows="7"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="..."
      />
    </div>
  );
}
