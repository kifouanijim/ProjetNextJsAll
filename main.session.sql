ALTER TABLE ViewingHistory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    artwork_id INTEGER NOT NULL,
    viewed_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (artwork_id) REFERENCES Artworks(id)
);
