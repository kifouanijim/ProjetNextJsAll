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
    showPropositionPrompt();

    // Récupérer le message passé dans l'URL
    const message = new URLSearchParams(window.location.search).get("message");
    if (message) {
      Crisp.message.show("text", message); // Affiche le message dans le bot
    }
  }, []);

  // Affiche un message d'invite pour proposer une œuvre
  const showPropositionPrompt = () => {
    Crisp.message.show(
      "text",
      "Pour proposer une œuvre, entrez le nom de l'œuvre en commençant par 'Proposition:' suivi du titre."
    );
  };

  // Fonction d'enregistrement de proposition
  const recordProposition = async (userId: number, propositionName: string) => {
    const response = await fetch("/api/proposition", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        propositionName,
        proposedAt: new Date().toISOString(),
      }),
    });

    const data = await response.json();
    if (response.ok) {
      Crisp.message.show("text", "Proposition enregistrée avec succès !");
    } else {
      Crisp.message.show("text", "Erreur : " + data.message);
    }
  };

  // Fonction de simulation d'écoute de message
  const simulateMessageListening = (message: string) => {
    // Vérifie si le message commence par "Proposition:" pour l'enregistrer
    if (message.startsWith("Proposition:")) {
      const userId = 1; // ID de l'utilisateur connecté
      const propositionName = message.replace("Proposition:", "").trim();
      recordProposition(userId, propositionName);
    }
  };

  // Fonction d'affichage du carrousel
  const showCaroosel = () => {
    Crisp.message.show("carousel", {
      text: "Voici la liste des œuvres :",
      targets: [
        {
          title: "Dragon Ball",
          description: "Dragon Ball (ドラゴンボール, Doragon Bōru?, litt. Dragon Ball) est un manga d'Akira Toriyama...",
          actions: [
            {
              label: "En savoir plus",
              url: "/dragonball",
            },
          ],
        },
        {
          title: "Fairy Tail",
          description: "Fairy Tail (フェアリーテイル, Fearī Teiru?, jeu de mots anglophone sur tale conte et tail queue)...",
          actions: [
            {
              label: "En savoir plus",
              url: "/fairytail",
            },
          ],
        },
      ],
    });
  };

  // Fonction d'enregistrement de visionnage
  const recordViewing = async (sagaTitle: string, redirectUrl: string) => {
    const userId = 1;
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
      router.push(redirectUrl);
    } else {
      Crisp.message.show("text", "Erreur lors de l'enregistrement du visionnage");
    }
  };

  return (
    <>
      <h1>Page 1</h1>
      <button onClick={showCaroosel}>Affichez le carousel</button>
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
