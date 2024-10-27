// components/ArtworkViewer.tsx
import React from 'react';
import { saveViewingHistory } from '@/actions/SaveViewingHistory';
import { getSession } from "@/utils/sessions"; // Assurez-vous que cette fonction est bien importée

const ArtworkViewer: React.FC<{ artworkId: number }> = ({ artworkId }) => {
    const handleViewArtwork = async () => {
        try {
            // Récupérer la session pour obtenir l'ID de l'utilisateur connecté
            const session = await getSession();
            if (!session || !session.rowid) {
                throw new Error('Utilisateur non connecté');
            }

            // Appeler la fonction pour sauvegarder l'historique de visionnage
            const result = await saveViewingHistory(session.rowid, artworkId);
            console.log('Historique de visionnage enregistré:', result);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de l\'historique de visionnage:', error);
        }
    };

    return (
        <div>
            <h2>Œuvre #{artworkId}</h2>
            <button onClick={handleViewArtwork}>Visionner</button>
        </div>
    );
};

export default ArtworkViewer;
