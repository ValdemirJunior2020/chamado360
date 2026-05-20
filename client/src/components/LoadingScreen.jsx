// C:\Users\Valdemir Goncalves\Desktop\Meus Projetos\Chamado360\client\src\components\LoadingScreen.jsx

import { translations } from "../data/translations";

export default function LoadingScreen({ language = "pt" }) {
  const t = translations[language] || translations.pt;

  const loadingText = {
    pt: "Analisando suas respostas com sabedoria...",
    en: "Analyzing your answers with wisdom...",
    es: "Analizando tus respuestas con sabiduría..."
  };

  const funnyRelaxText = {
    pt: "Relaxa 😜 Esse processo pode levar um tempinho... talvez você precise de um celular melhor ou de um sinal de Wi-Fi mais forte 😜😜😜",
    en: "Relax 😜 This process can take some time... you might need a better phone or a stronger Wi-Fi signal 😜😜😜",
    es: "Relájate 😜 Este proceso puede tardar un poquito... tal vez necesitas un mejor celular o una señal de Wi-Fi más fuerte 😜😜😜"
  };

  return (
    <main className="page-section loading-page">
      <div className="container">
        <div className="loading-card card-premium text-center">
          <img
            src="/loading.gif"
            alt="Loading animation"
            className="loading-gif"
          />

          <h1 className="loading-title">
            {loadingText[language] || loadingText.pt}
          </h1>

          <p className="loading-relax-text">
            {funnyRelaxText[language] || funnyRelaxText.pt}
          </p>

          <div className="loading-dots" aria-label="Loading">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <p className="loading-small-text">
            {t.appName || "Chamado360"}
          </p>
        </div>
      </div>
    </main>
  );
}