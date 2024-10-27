// pages/api/viewingHistory.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { getSession } from "@/utils/sessions"; // Assurez-vous que cette fonction est correctement importée

// Fonction pour gérer les requêtes
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { artworkId } = req.body; // Assurez-vous que `artworkId` est bien passé dans le corps de la requête

        try {
            // Ouvrir la connexion à la base de données
            const db = await open({
                filename: process.env.DATABASE_NAME || "./database.db", // Spécifiez le chemin de la base de données
                driver: sqlite3.Database,
            });

            // Obtenir la session de l'utilisateur connecté
            const session = await getSession(); // Assurez-vous que cette fonction retourne bien les informations de l'utilisateur

            if (!session || !session.rowid) {
                return res.status(401).json({ message: 'Utilisateur non connecté' });
            }

            // Insérer l'historique de visionnage
            const sql = 'INSERT INTO ViewingHistory (user_id, artwork_id, viewed_at) VALUES (?, ?, ?)';
            const result = await db.run(sql, [session.rowid, artworkId, new Date().toISOString()]);

            // Fermer la connexion à la base de données
            await db.close();

            res.status(200).json({ id: result.lastID, userId: session.rowid, artworkId, viewedAt: new Date().toISOString() });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erreur lors de l\'enregistrement du visionnage' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
