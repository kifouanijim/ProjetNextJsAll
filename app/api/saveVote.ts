// pages/api/vote.ts

"use server";

import { NextResponse } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

// Fonction principale pour gérer la requête POST
export async function POST(req: Request) {
  const body = await req.json();
  const { userId, sagaTitle } = body;

  // Vérifie si les données nécessaires sont présentes
  if (!userId || !sagaTitle) {
    return NextResponse.json({ message: "Les données sont manquantes." }, { status: 400 });
  }

  // Appel de la fonction pour enregistrer le vote
  const response = await recordVote(userId, sagaTitle);

  // Retourne la réponse appropriée
  return NextResponse.json({ message: response });
}

// Fonction pour enregistrer un vote dans la base de données
async function recordVote(userId: number, sagaTitle: string) {
  const db = await open({
    filename: process.env.DATABASE_NAME || ":memory:",
    driver: sqlite3.Database,
  });

  try {
    const insertVote = `
      INSERT INTO vote (utilisateur_id, oeuvre, date_vote)
      VALUES (?, ?, datetime('now'))
    `;

    const result = await db.run(insertVote, [userId, sagaTitle]);

    // Retourne vrai et un message si une ligne a été ajoutée
    if (result && typeof result.changes === "number" && result.changes > 0) {
      return "Vote enregistré avec succès.";
    }
    return "Erreur lors de l'enregistrement du vote.";
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du vote :", error);
    return "Erreur lors de l'enregistrement du vote.";
  } finally {
    await db.close();
  }
}
