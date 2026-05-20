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
    console.error("OpenAI analysis error:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao gerar análise."
    });
  }
});

export default router;