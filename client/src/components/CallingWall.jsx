// C:\Users\Valdemir Goncalves\Desktop\Meus Projetos\Chamado360\client\src\components\CallingWall.jsx

import { useEffect, useState } from "react";
import { getPublicCallings } from "../services/callingPublicService";

const text = {
  pt: {
    title: "Mural de Chamados",
    subtitle:
      "Veja algumas direções percebidas nas análises. São reflexões, não sentenças finais.",
    empty: "Ainda não há chamados no mural.",
    unavailable:
      "O mural está temporariamente indisponível. Verifique as regras do Firestore."
  },
  en: {
    title: "Calling Wall",
    subtitle:
      "See some directions noticed in the analyses. These are reflections, not final sentences.",
    empty: "There are no callings on the wall yet.",
    unavailable:
      "The wall is temporarily unavailable. Check your Firestore rules."
  },
  es: {
    title: "Mural de Llamados",
    subtitle:
      "Mira algunas direcciones percibidas en los análisis. Son reflexiones, no sentencias finales.",
    empty: "Todavía no hay llamados en el mural.",
    unavailable:
      "El mural no está disponible temporalmente. Verifica las reglas de Firestore."
  }
};

const CallingWall = ({ language = "pt" }) => {
  const [callings, setCallings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasPermissionError, setHasPermissionError] = useState(false);

  const selectedText = text[language] || text.pt;

  useEffect(() => {
    const loadCallings = async () => {
      try {
        setHasPermissionError(false);
        const data = await getPublicCallings();
        setCallings(data);
      } catch (error) {
        console.error("Error loading public callings:", error);
        setHasPermissionError(true);
      } finally {
        setLoading(false);
      }
    };

    loadCallings();
  }, []);

  return (
    <section className="calling-wall-section mt-5">
      <div className="calling-wall-header text-center mb-4">
        <span className="section-kicker">Chamado360</span>
        <h2>{selectedText.title}</h2>
        <p>{selectedText.subtitle}</p>
      </div>

      {loading ? (
        <div className="text-center text-light opacity-75">Loading...</div>
      ) : hasPermissionError ? (
        <div className="calling-wall-empty">{selectedText.unavailable}</div>
      ) : callings.length === 0 ? (
        <div className="calling-wall-empty">{selectedText.empty}</div>
      ) : (
        <div className="row g-3">
          {callings.map((item) => (
            <div className="col-12 col-md-6 col-lg-4" key={item.id}>
              <div className="calling-wall-card">
                <div className="calling-wall-avatar">
                  {item.name?.charAt(0)?.toUpperCase() || "?"}
                </div>

                <div>
                  <h5>{item.name}</h5>
                  <p>{item.callingTitle}</p>

                  {item.ephesiansGift && (
                    <span className="calling-wall-badge">
                      Efésios 4:11 · {item.ephesiansGift}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CallingWall;