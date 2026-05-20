// client/src/components/ProgressBar.jsx
export default function ProgressBar({ current, total }) {
  const percent = Math.round(((current + 1) / total) * 100);

  return (
    <div className="progress-wrapper">
      <div className="d-flex justify-content-between small text-white-50 mb-2">
        <span>{current + 1}</span>
        <span>{total}</span>
      </div>
      <div className="progress custom-progress" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
        <div className="progress-bar" style={{ width: `${percent}%` }}>{percent}%</div>
      </div>
    </div>
  );
}
