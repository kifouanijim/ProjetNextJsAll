// pages/index.tsx (ou un autre fichier de page)
import React from 'react';
import ArtworkViewer from '@/components/ArtworkViewer';

const ArtworkList: React.FC = () => {
    const artworks = [1, 2, 3]; // Liste d'IDs d'œuvres pour l'exemple

    return (
        <div>
            <h1>Liste des œuvres</h1>
            {artworks.map((artworkId) => (
                <ArtworkViewer key={artworkId} artworkId={artworkId} />
            ))}
        </div>
    );
};

export default ArtworkList;
