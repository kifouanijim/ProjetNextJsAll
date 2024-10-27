"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import du routeur Next.js

export default function Page1() {
  const router = useRouter(); // Créez une instance du routeur

  const userlogin = () => {
    Crisp.configure(process.env.NEXT_PUBLIC_WEBSITE_ID || "", {
      autoload: false,
    });
    Crisp.chat.open();
  };

  useEffect(() => {
    userlogin();

    // Récupérer le message passé dans l'URL
    const message = new URLSearchParams(window.location.search).get('message');
    if (message) {
      Crisp.message.show("text", message); // Affiche le message dans le bot
    }
  }, []);
  return (
    <div>
      <h1>Mon Compte</h1>
      {/* Contenu de la page du compte */}
    </div>
  );

  const showCaroosel = () => {
    const list = [
      {
        title: "Dragon Ball",
        description: "Dragon Ball (ドラゴンボール, Doragon Bōru?, litt. Dragon Ball) est un manga d'Akira Toriyama...",
        actions: [
          {
            label: "Voir Dragon Ball",
            url: "/dragonball",
          },
        ],
      },
      {
        title: "Fairy Tail",
        description: "Fairy Tail (フェアリーテイル, Fearī Teiru?, jeu de mots anglophone sur tale conte et tail queue)...",
        actions: [
          {
            label: "Voir Fairy Tail",
            url: "/fairytail",
          },
        ],
      },
    ];

    // Affichage d'un carousel dans le bot
    Crisp.message.show("carousel", {
      text: "Voici la liste des œuvres :",
      targets: list,
    });
  };

  const recordVote = async (userId: number, sagaTitle: string) => {
    const response = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, sagaTitle }),
    });

    const data = await response.json();
    if (response.ok) {
      // Envoi direct du message dans le bot
      Crisp.message.show("text", data.message);

      // Redirigez l'utilisateur vers la page mon-compte avec un message
      router.push(`/mon-compte?message=${encodeURIComponent(data.message)}`);
    } else {
      Crisp.message.show("text", "Erreur : " + data.message); // Envoi direct du message d'erreur
    }
  };

  const handleVote = (sagaTitle: string) => {
    // Montre le carousel d'œuvres
    showCaroosel();

    // Enregistre le vote
    recordVote(1, sagaTitle);
  };

  return (
    <>
      <h1>Page 1</h1>
      <button onClick={showCaroosel}>Affichez le carousel</button>
    </>
  );
}

