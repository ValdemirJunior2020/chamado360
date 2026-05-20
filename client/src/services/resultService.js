// C:\Users\Valdemir Goncalves\Desktop\Meus Projetos\Chamado360\client\src\services\resultService.js

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const saveAnalysisResult = async ({
  name,
  userId,
  language,
  result,
  callingTitle
}) => {
  if (!result || !result.trim()) {
    return null;
  }

  const docRef = await addDoc(collection(db, "chamado_results"), {
    name: name || "",
    userId: userId || "",
    language: language || "pt",
    result,
    callingTitle: callingTitle || "",
    createdAt: serverTimestamp()
  });

  return docRef.id;
};