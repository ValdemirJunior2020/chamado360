// client/src/components/LoadingScreen.jsx
export default function LoadingScreen({ message }) {
  return (
    <section className="page-section center-section">
      <div className="loading-card card-premium text-center">
        <div className="spinner-border gold-spinner mb-4" role="status" />
        <h2>{message}</h2>
        <p className="text-white-50 mt-3">Chamado360</p>
      </div>
    </section>
  );
}
