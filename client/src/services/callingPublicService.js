// C:\Users\Valdemir Goncalves\Desktop\Meus Projetos\Chamado360\client\src\services\callingPublicService.js

import {
  collection,
  addDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export const savePublicCalling = async ({
  name,
  userId,
  language,
  callingTitle,
  ephesiansGift
}) => {
  if (!name || !callingTitle) return null;

  const docRef = await addDoc(collection(db, "chamado_public"), {
    name: name.trim(),
    userId: userId || "",
    language: language || "pt",
    callingTitle,
    ephesiansGift: ephesiansGift || "",
    createdAt: serverTimestamp()
  });

  return docRef.id;
};

export const getPublicCallings = async () => {
  const q = query(
    collection(db, "chamado_public"),
    orderBy("createdAt", "desc"),
    limit(20)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};