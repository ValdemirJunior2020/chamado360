// C:\Users\Valdemir Goncalves\Desktop\Meus Projetos\Chamado360\server\routes\callingRoutes.js

import express from "express";
import { generateCallingReflection } from "../services/openaiService.js";

const router = express.Router();

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
    console.error("Full error:", error);
    console.error("====================================");

    return res.status(500).json({
      success: false,
      message: error?.message || "Erro ao gerar análise."
    });
  }
});

export default router;