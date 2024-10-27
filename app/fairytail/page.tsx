// pages/FairyTail.tsx
"use client"; // Assurez-vous d'ajouter cette ligne en haut de votre fichier

import React from 'react';
import styles from './FairyTail.module.css';

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

const characters = [
  {
    name: "Natsu Dragnir",
    role: "Chasseur de Dragons de feu",
    description:
      "Le protagoniste principal, membre de Fairy Tail, qui rêve de devenir le plus grand mage et de retrouver son ami Igneel.",
  },
  {
    name: "Lucy Heartfilia",
    role: "Magière Céleste",
    description:
      "Une mage qui utilise des clés de constellations et qui aspire à rejoindre Fairy Tail. Elle devient proche de Natsu et de ses amis.",
  },
  {
    name: "Gray Fullbuster",
    role: "Magière de la Glace",
    description:
      "Un mage qui maîtrise la magie de la glace et qui a une rivalité amicale avec Natsu.",
  },
  {
    name: "Erza Scarlet",
    role: "Magière de l'Armure",
    description:
      "Une puissante mage qui utilise la magie de requip pour changer d'armure et d'armes pendant le combat.",
  },
  {
    name: "Happy",
    role: "Félin volant",
    description:
      "Un chat magique qui accompagne Natsu dans ses aventures, capable de voler et de parler.",
  },
];

const FairyTail: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fairy Tail</h1>
      <h2 className={styles.subTitle}>Arcs Narratifs</h2>
      <ul className={styles.arcsList}>
        {arcs.map((arc, index) => (
          <li key={index} className={styles.arcItem}>
            <h3 className={styles.arcTitle}>{arc.title}</h3>
            <p>{arc.description}</p>
          </li>
        ))}
      </ul>
      <h2 className={styles.subTitle}>Personnages Principaux</h2>
      <ul className={styles.charactersList}>
        {characters.map((character, index) => (
          <li key={index} className={styles.characterItem}>
            <h3 className={styles.characterTitle}>{character.name}</h3>
            <p><strong>Rôle :</strong> {character.role}</p>
            <p>{character.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FairyTail;
