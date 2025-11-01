import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "./config";
import type { Module, Lesson } from "../types";

export async function getModules(): Promise<Module[]> {
  const modulesCol = collection(db, "modules");
  const q = query(modulesCol, orderBy("order"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Module));
}

export async function getLessonsForModule(moduleId: string): Promise<Lesson[]> {
  const lessonsCol = collection(db, "lessons");
  const q = query(lessonsCol, where("moduleId", "==", moduleId), orderBy("order"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lesson));
}

export async function getAllLessons(): Promise<Lesson[]> {
    const lessonsCol = collection(db, "lessons");
    const snapshot = await getDocs(lessonsCol);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lesson));
}
