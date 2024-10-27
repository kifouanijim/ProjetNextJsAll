// actions/SaveViewingHistory.ts
export async function saveViewingHistory(userId: number, artworkId: number) {
    const response = await fetch('/api/viewingHistory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, artworkId }),
    });

    if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement du visionnage');
    }

    return response.json();
}
