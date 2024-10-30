"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page1() {
  const router = useRouter();

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

  const showCaroosel = () => {
    // Affichage d'un carousel dans le bot avec actions fictives
    Crisp.message.show("carousel", {
      text: "Voici la liste des œuvres :",
      targets: [
        {
          title: "Dragon Ball",
          description: "Dragon Ball (ドラゴンボール, Doragon Bōru?, litt. Dragon Ball) est un manga d'Akira Toriyama...",
          actions: [
            {
              label: "En savoir plus", // Action fictive pour satisfaire le type
              url: "/dragonball", // URL factice
            },
          ],
        },
        {
          title: "Fairy Tail",
          description: "Fairy Tail (フェアリーテイル, Fearī Teiru?, jeu de mots anglophone sur tale conte et tail queue)...",
          actions: [
            {
              label: "En savoir plus", // Action fictive pour satisfaire le type
              url: "/fairytail", // URL factice
            },
          ],
        },
      ],
    });
  };

  const recordViewing = async (sagaTitle: string, redirectUrl: string) => {
    const userId = 1; // Remplacez par l'ID de l'utilisateur connecté
    const response = await fetch("/api/viewing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        sagaTitle,
        viewedAt: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      Crisp.message.show("text", "Visionnage enregistré avec succès");
      // Rediriger vers la page de l'œuvre
      router.push(redirectUrl);
    } else {
      Crisp.message.show("text", "Erreur lors de l'enregistrement du visionnage");
    }
  };

  return (
    <>
      <h1>Page 1</h1>
      <button onClick={showCaroosel}>Affichez le carousel</button>

      {/* Boutons pour enregistrer le visionnage */}
      <div>
        <button onClick={() => recordViewing("Dragon Ball", "/dragonball")}>
          Voir Dragon Ball
        </button>
        <button onClick={() => recordViewing("Fairy Tail", "/fairytail")}>
          Voir Fairy Tail
        </button>
      </div>
    </>
  );
}
