// types/ViewingHistory.ts
export interface ViewingHistory {
    id: number;
    userId: number;        // ID de l'utilisateur
    artworkId: number;     // ID de l'œuvre
    viewedAt: Date;        // Date et heure du visionnage
}
