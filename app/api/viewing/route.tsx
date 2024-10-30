"use server";

import { NextResponse } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";

// Endpoint pour enregistrer un visionnage
export async function POST(req: Request) {
  const body = await req.json();
  const { userId, sagaTitle, viewedAt } = body;

  // Vérifie si les données nécessaires sont présentes
  if (!userId || !sagaTitle || !viewedAt) {
    return NextResponse.json({ message: "Les données sont manquantes." }, { status: 400 });
  }

  // Tente d'enregistrer le visionnage
  const response = await recordViewing(userId, sagaTitle, viewedAt);

  // Vérifie si l'enregistrement a réussi
  if (!response) {
    return NextResponse.json({ message: "Erreur lors de l'enregistrement du visionnage." }, { status: 500 });
  }

  return NextResponse.json({ message: "Visionnage enregistré avec succès." });
}

// Fonction pour enregistrer un visionnage dans la base de données
async function recordViewing(userId: number, sagaTitle: string, viewedAt: string) {
  // Ouvre la connexion à la base de données
  const db = await open({
    filename: process.env.DATABASE_NAME || ":memory:", // Remplacez par votre nom de base de données
    driver: sqlite3.Database,
  });

  try {
    // Prépare l'instruction SQL pour insérer un visionnage
    const insertViewing = `
      INSERT INTO viewing (utilisateur_id, oeuvre, date_visionnage)
      VALUES (?, ?, ?)
    `;

    // Exécute l'instruction SQL
    const result = await db.run(insertViewing, [userId, sagaTitle, viewedAt]);

    // Vérifie si result est défini et retourne vrai si une ligne a été ajoutée, sinon faux
    return result && typeof result.changes === "number" && result.changes > 0;
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du visionnage :", error);
    return false; // En cas d'erreur, retourne faux
  } finally {
    await db.close(); // Ferme la connexion à la base de données
  }
}
