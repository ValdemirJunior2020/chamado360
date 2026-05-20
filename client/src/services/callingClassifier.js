// C:\Users\Valdemir Goncalves\Desktop\Meus Projetos\Chamado360\client\src\services\callingClassifier.js

const normalizeText = (text) => {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const labels = {
  pt: {
    pastoral: "possível chamado pastoral",
    prophetic: "possível sensibilidade profética",
    evangelistic: "possível chamado evangelístico",
    apostolic: "possível perfil apostólico/empreendedor",
    teaching: "possível chamado de ensino",
    intercession: "possível chamado de intercessão e cuidado",
    service: "possível chamado de serviço e ajuda prática",
    creative: "possível chamado criativo e comunicador"
  },
  en: {
    pastoral: "possible pastoral calling",
    prophetic: "possible prophetic sensitivity",
    evangelistic: "possible evangelistic calling",
    apostolic: "possible apostolic/entrepreneurial profile",
    teaching: "possible teaching calling",
    intercession: "possible calling of intercession and care",
    service: "possible calling of service and practical help",
    creative: "possible creative and communication calling"
  },
  es: {
    pastoral: "posible llamado pastoral",
    prophetic: "posible sensibilidad profética",
    evangelistic: "posible llamado evangelístico",
    apostolic: "posible perfil apostólico/emprendedor",
    teaching: "posible llamado de enseñanza",
    intercession: "posible llamado de intercesión y cuidado",
    service: "posible llamado de servicio y ayuda práctica",
    creative: "posible llamado creativo y comunicador"
  }
};

const giftNames = {
  pt: {
    pastoral: "Pastoral",
    prophetic: "Profético",
    evangelistic: "Evangelístico",
    apostolic: "Apostólico",
    teaching: "Mestre/Ensino",
    intercession: "Intercessão/Cuidado",
    service: "Serviço",
    creative: "Criativo/Comunicação"
  },
  en: {
    pastoral: "Pastoral",
    prophetic: "Prophetic",
    evangelistic: "Evangelistic",
    apostolic: "Apostolic",
    teaching: "Teacher/Teaching",
    intercession: "Intercession/Care",
    service: "Service",
    creative: "Creative/Communication"
  },
  es: {
    pastoral: "Pastoral",
    prophetic: "Profético",
    evangelistic: "Evangelístico",
    apostolic: "Apostólico",
    teaching: "Maestro/Enseñanza",
    intercession: "Intercesión/Cuidado",
    service: "Servicio",
    creative: "Creativo/Comunicación"
  }
};

export const classifyCalling = ({ answers, language = "pt" }) => {
  const text = normalizeText(Array.isArray(answers) ? answers.join(" ") : answers);

  const scores = {
    pastoral: 0,
    prophetic: 0,
    evangelistic: 0,
    apostolic: 0,
    teaching: 0,
    intercession: 0,
    service: 0,
    creative: 0
  };

  const addScore = (category, words, points = 1) => {
    words.forEach((word) => {
      if (text.includes(normalizeText(word))) {
        scores[category] += points;
      }
    });
  };

  addScore("pastoral", [
    "cuidar",
    "cuidado",
    "aconselhar",
    "conselho",
    "pessoas feridas",
    "ovelhas",
    "discipulado",
    "restaurar",
    "escutar",
    "ouvir",
    "pastoral",
    "familia",
    "cura emocional",
    "help people",
    "care",
    "counsel",
    "listen",
    "discipleship",
    "healing",
    "cuidar personas",
    "consejo",
    "escuchar"
  ], 2);

  addScore("prophetic", [
    "discernir",
    "discernimento",
    "alertar",
    "verdade",
    "direcao",
    "direção",
    "orar e sentir",
    "sensibilidade espiritual",
    "justica",
    "justiça",
    "profetico",
    "prophet",
    "prophetic",
    "discernment",
    "spiritual sensitivity",
    "verdad",
    "justicia",
    "profetico"
  ], 2);

  addScore("evangelistic", [
    "evangelizar",
    "evangelismo",
    "ganhar almas",
    "falar de jesus",
    "pregar",
    "missao",
    "missões",
    "mission",
    "missions",
    "share jesus",
    "preach",
    "evangelism",
    "evangelizar",
    "misiones",
    "hablar de jesus"
  ], 2);

  addScore("apostolic", [
    "abrir",
    "começar",
    "comecar",
    "fundar",
    "plantar",
    "liderar projetos",
    "empreender",
    "empreendedorismo",
    "negocios",
    "negócios",
    "tecnologia",
    "criar soluções",
    "solucoes",
    "startup",
    "build",
    "business",
    "entrepreneur",
    "technology",
    "create solutions",
    "emprender",
    "negocios",
    "crear soluciones"
  ], 2);

  addScore("teaching", [
    "ensinar",
    "ensino",
    "explicar",
    "treinar",
    "professor",
    "estudo",
    "biblia",
    "bíblia",
    "mentoria",
    "teach",
    "teaching",
    "explain",
    "training",
    "mentor",
    "enseñar",
    "enseñanza",
    "explicar",
    "entrenar"
  ], 2);

  addScore("intercession", [
    "orar",
    "oração",
    "interceder",
    "intercessao",
    "intercessão",
    "choro",
    "dor dos outros",
    "pray",
    "prayer",
    "intercede",
    "intercession",
    "orar",
    "oracion",
    "interceder"
  ], 2);

  addScore("service", [
    "ajuda pratica",
    "ajuda prática",
    "servir",
    "bastidores",
    "organizar",
    "administrar",
    "resolver problema",
    "help",
    "serve",
    "behind the scenes",
    "organize",
    "practical help",
    "servir",
    "ayuda practica",
    "organizar"
  ], 2);

  addScore("creative", [
    "arte",
    "musica",
    "música",
    "midia",
    "mídia",
    "comunicacao",
    "comunicação",
    "criatividade",
    "design",
    "video",
    "escrever",
    "art",
    "music",
    "media",
    "communication",
    "creativity",
    "write",
    "arte",
    "musica",
    "medios",
    "creatividad"
  ], 2);

  let highestCategory = "service";
  let highestScore = 0;

  Object.entries(scores).forEach(([category, score]) => {
    if (score > highestScore) {
      highestCategory = category;
      highestScore = score;
    }
  });

  const selectedLanguage = labels[language] ? language : "pt";

  return {
    category: highestCategory,
    callingTitle: labels[selectedLanguage][highestCategory],
    ephesiansGift: giftNames[selectedLanguage][highestCategory],
    score: highestScore,
    scores
  };
};