// C:\Users\Valdemir Goncalves\Desktop\Meus Projetos\Chamado360\server\routes\callingRoutes.js

import express from "express";
import { generateCallingReflection } from "../services/openaiService.js";

const router = express.Router();

const getFriendlyErrorMessage = (error, language = "pt") => {
  const code = error?.code || error?.type;

  if (code === "insufficient_quota") {
    const messages = {
      pt:
        "😅 Opa... isso aqui custa dinheiro e o crédito do Junior para entregar sua análise acabou. Mande uma mensagem para ele no WhatsApp 7543669922 para pegar seu resultado. Enquanto isso, ore, respire e não desista do seu chamado 🙏",
      en:
        "😅 Oops... this costs money and Junior’s credit to deliver your analysis has run out. Please message him on WhatsApp at 7543669922 to get your result. Meanwhile, pray, breathe, and don’t give up on your calling 🙏",
      es:
        "😅 Ups... esto cuesta dinero y el crédito de Junior para entregar tu análisis se acabó. Envíale un mensaje por WhatsApp al 7543669922 para recibir tu resultado. Mientras tanto, ora, respira y no te rindas en tu llamado 🙏"
    };

    return messages[language] || messages.pt;
  }

  if (code === "invalid_api_key") {
    const messages = {
      pt: "A chave da OpenAI parece inválida. Verifique o arquivo server/.env.",
      en: "The OpenAI API key seems invalid. Please check the server/.env file.",
      es: "La clave de OpenAI parece inválida. Verifica el archivo server/.env."
    };

    return messages[language] || messages.pt;
  }

  if (code === "rate_limit_exceeded") {
    const messages = {
      pt:
        "Muita gente buscando o chamado ao mesmo tempo 😅 Aguarde alguns segundos e tente novamente.",
      en:
        "Too many people are searching for their calling at the same time 😅 Please wait a few seconds and try again.",
      es:
        "Muchas personas están buscando su llamado al mismo tiempo 😅 Espera unos segundos e inténtalo de nuevo."
    };

    return messages[language] || messages.pt;
  }

  const messages = {
    pt: "Erro ao gerar análise. Tente novamente.",
    en: "Error generating analysis. Please try again.",
    es: "Error al generar el análisis. Inténtalo de nuevo."
  };

  return messages[language] || messages.pt;
};

router.post("/analyze", async (req, res) => {
  try {
    const { language, name, answers } = req.body;

    if (!language || !name || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: language, name, or answers."
      });
    }

    const result = await generateCallingReflection({
      language,
      name,
      answers
    });

    return res.status(200).json({
      success: true,
      result
    });
  } catch (error) {
    console.error("====================================");
    console.error("OPENAI / BACKEND ERROR");
    console.error("Message:", error?.message);
    console.error("Status:", error?.status);
    console.error("Code:", error?.code);
    console.error("Type:", error?.type);
    console.error("====================================");

    const language = req.body?.language || "pt";

    return res.status(500).json({
      success: false,
      code: error?.code || error?.type || "unknown_error",
      message: getFriendlyErrorMessage(error, language)
    });
  }
});

export default router;