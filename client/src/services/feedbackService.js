// client/src/services/feedbackService.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const saveFeedback = async ({ name, userId, language, feedback }) => {
  await addDoc(collection(db, "chamado_feedback"), {
    name: name || "",
    userId: userId || "",
    language: language || "pt",
    feedback,
    createdAt: serverTimestamp()
  });
};
