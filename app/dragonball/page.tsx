"use client";

import React, { useEffect, useState } from 'react';
import styles from './Scene.module.css';
import { useRouter } from 'next/navigation';
import { Crisp } from "crisp-sdk-web";

const arcs = [
  {
    title: "Arc Saiyan",
    description:
      "Dans cet arc, Goku découvre ses origines Saiyan et doit défendre la Terre contre Vegeta et Nappa.",
  },
  {
    title: "Arc Freezer",
    description:
      "Goku et ses amis voyagent sur Namek pour rassembler les Dragon Balls et affrontent le tyran galactique Freezer.",
  },
  {
    title: "Arc Cell",
    description:
      "Un être artificiel nommé Cell menace la Terre, et un tournoi d'arts martiaux est organisé pour décider du sort de la planète.",
  },
  {
    title: "Arc Buu",
    description:
      "Le démon Majin Buu est réveillé et menace de détruire l'univers. Goku, Vegeta, et les autres doivent l'arrêter.",
  },
];

const characters = [
  {
    name: "Goku",
    role: "Protagoniste principal",
    description:
      "Un Saiyan élevé sur Terre qui devient le plus grand défenseur de la planète.",
  },
  {
    name: "Vegeta",
    role: "Prince des Saiyans",
    description:
      "Le rival de Goku, qui évolue de méchant à allié puissant et fidèle.",
  },
  {
    name: "Freezer",
    role: "Antagoniste majeur",
    description:
      "Un tyran galactique impitoyable qui cherche à contrôler l'univers et détruire Goku.",
  },
  {
    name: "Cell",
    role: "Antagoniste majeur",
    description:
      "Un être artificiel créé pour atteindre la perfection en absorbant les autres combattants.",
  },
  {
    name: "Buu",
    role: "Antagoniste majeur",
    description:
      "Un puissant démon capable de régénération, dont la personnalité évolue au fur et à mesure de ses transformations.",
  },
];

const Scene: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const userId = 1; // Remplacez par l'ID de l'utilisateur connecté

  // Fonction pour configurer et ouvrir Crisp
  const userlogin = () => {
    Crisp.configure(process.env.NEXT_PUBLIC_WEBSITE_ID || "", {
      autoload: false,
    });
    Crisp.chat.open();
  };

  // Fonction pour créer un effet de foudre
  const createLightning = () => {
    const scene = document.querySelector(`.${styles.scene}`);
    if (!scene) return;

    const lightning = document.createElement('div');
    lightning.className = styles.lightning;
    scene.appendChild(lightning);

    lightning.style.left = `${Math.random() * 100}%`;
    lightning.style.animationDuration = `${0.2 + Math.random() * 0.5}s`;

    lightning.addEventListener('animationend', () => {
      lightning.remove();
    });
  };

  // Fonction de vote général pour l'œuvre
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

  // Fonction de vote pour l'œuvre entière
  const handleGeneralVote = async () => {
    handleVote("Dragon Ball");
  };

  useEffect(() => {
    userlogin();

    const interval = setInterval(createLightning, 1000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.scene}>
      <div className={styles.warrior}></div>
      <div className={styles.mountains}></div>
      <div className={styles.details}>
        <h2>Arcs Narratifs</h2>
        <ul>
          {arcs.map((arc, index) => (
            <li key={index}>
              <h3>{arc.title}</h3>
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
        <h2>Personnages Principaux</h2>
        <ul>
          {characters.map((character, index) => (
            <li key={index}>
              <h3>{character.name}</h3>
              <p><strong>Rôle :</strong> {character.role}</p>
              <p>{character.description}</p>
            </li>
          ))}
        </ul>
        <h2>Votez pour l'œuvre entière</h2>
        <button className={styles.voteButton} onClick={handleGeneralVote}>
          Voter pour Dragon Ball
        </button>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Scene;
