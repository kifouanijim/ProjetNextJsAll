"use client";

import React, { useState } from 'react';
import styles from './FairyTail.module.css';
import { useRouter } from 'next/navigation'; // Import du routeur Next.js
import { Crisp } from "crisp-sdk-web";

const arcs = [
  {
    title: "Arc de la Guilde de Fairy Tail",
    description:
      "Introduction à la guilde Fairy Tail et ses membres emblématiques, mettant en avant leur camaraderie et leur détermination.",
  },
  {
    title: "Arc de l'Île Tenrou",
    description:
      "La guilde se bat pour protéger l'île Tenrou et affronter le Dragon d'Acier, tandis que des révélations sur leur passé émergent.",
  },
  {
    title: "Arc de Tartaros",
    description:
      "Fairy Tail affronte la sombre guilde Tartaros, qui menace de libérer des démons sur le monde.",
  },
  {
    title: "Arc de l'Ordre de l'Éclipse",
    description:
      "Les membres de Fairy Tail doivent faire face à un groupe mystérieux qui manipule le temps et l'espace.",
  },
];

const FairyTail: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter(); // Créez une instance du routeur
  const userId = 1; // Remplacez par l'ID de l'utilisateur connecté

  // Fonction pour configurer et ouvrir Crisp
  const userlogin = () => {
    Crisp.configure(process.env.NEXT_PUBLIC_WEBSITE_ID || "", {
      autoload: false,
    });
    Crisp.chat.open();
  };

  // Fonction de vote
  const handleVote = async (sagaTitle: string) => {
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, sagaTitle }),
      });

      const data = await response.json();
      if (response.ok) {
        // Envoi du message de confirmation dans le chat bot
        Crisp.message.show("text", `Merci pour votre vote pour l'arc "${sagaTitle}" !`);

        // Redirigez l'utilisateur vers la page "mon-compte" avec le message
        router.push(`/mon-compte?message=${encodeURIComponent(data.message)}`);
      } else {
        setMessage(data.message || 'Erreur lors de l\'enregistrement du vote.');
      }
    } catch (error) {
      setMessage('Erreur de connexion au serveur.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fairy Tail</h1>
      <h2 className={styles.subTitle}>Arcs Narratifs</h2>
      <ul className={styles.arcsList}>
        {arcs.map((arc, index) => (
          <li key={index} className={styles.arcItem}>
            <h3 className={styles.arcTitle}>{arc.title}</h3>
            <p>{arc.description}</p>
            <button
              className={styles.voteButton}
              onClick={() => handleVote(arc.title)}
            >
              Voter pour cet arc
            </button>
          </li>
        ))}
      </ul>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default FairyTail;
