// client/src/services/nameService.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const saveUserName = async ({ name, language }) => {
  if (!name || !name.trim()) {
    return null;
  }

  const docRef = await addDoc(collection(db, "chamado_users"), {
    name: name.trim(),
    language: language || "pt",
    createdAt: serverTimestamp()
  });

  return docRef.id;
};
