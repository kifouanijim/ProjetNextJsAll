"use server";

import { NextResponse } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

// Endpoint pour enregistrer une proposition d'œuvre
export async function POST(req: Request) {
  const body = await req.json();
  const { userId, propositionName, proposedAt } = body;

  // Vérifie si les données nécessaires sont présentes
  if (!userId || !propositionName || !proposedAt) {
    return NextResponse.json({ message: "Données manquantes." }, { status: 400 });
  }

  // Tente d'enregistrer la proposition
  const response = await recordProposition(userId, propositionName, proposedAt);

  // Vérifie si l'enregistrement a réussi
  if (!response) {
    return NextResponse.json({ message: "Erreur lors de l'enregistrement de la proposition." }, { status: 500 });
  }

  return NextResponse.json({ message: "Proposition enregistrée avec succès." });
}

// Fonction pour enregistrer une proposition dans la base de données
async function recordProposition(userId: number, propositionName: string, proposedAt: string) {
  const db = await open({
    filename: process.env.DATABASE_NAME || ":memory:", // Remplacez par votre nom de base de données
    driver: sqlite3.Database,
  });

  try {
    const insertProposition = `
      INSERT INTO proposition (user_id, proposition_name, proposed_at)
      VALUES (?, ?, ?)
    `;
    const result = await db.run(insertProposition, [userId, propositionName, proposedAt]);
    return result && typeof result.changes === "number" && result.changes > 0;
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la proposition :", error);
    return false;
  } finally {
    await db.close();
  }
}
