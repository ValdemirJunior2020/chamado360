// client/src/api/openaiApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const generateCallingAnalysis = async ({ language, name, answers }) => {
  const response = await axios.post(`${API_BASE_URL}/api/calling/analyze`, {
    language,
    name,
    answers
  });

  return response.data;
};
