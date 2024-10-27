"use client";

import { Crisp } from "crisp-sdk-web";
import {useEffect} from "react";
export default function page1(){
    const userlogin = () =>{
        // ... Ajouter votre propre logique ici (récupératio du token de l'utilisateur connecté par exemple)

        // Configuration de Crisp (obligatoire pour utiliser le bot sur votre site)
        Crisp.configure(process.env.NEXT_PUBLIC_WEBSITE_ID || "", {
            autoload: false, // Si vous voulez afficher le bot immédiatement, passez à 'true' ici
        });
        // Récupération de l'historique d'une conversation Crisp
        // Crisp.setTokenId("token");//
        // Affichage du bot (utile uniquement si 'autoload: false' dans la configuration)
        // Crisp.load();
        // Ouverture du bot
        Crisp.chat.open()
    }
    useEffect(()=>{
        userlogin();
    })

    const showCaroosel = ()=>{const list = [
        {
          title: "dragon ball ",
          description: "Dragon Ball (ドラゴンボール, Doragon Bōru?, litt. Dragon Ball) est un manga d'Akira Toriyama prépublié dans le magazine Weekly Shōnen Jump du 20 novembre 1984 au 23 mai 1995 et édité par Shūeisha en 42 volumes reliés du 10 septembre 1985 au 4 août 1995. Glénat publie l'édition française depuis février 1993.",
          actions: [
            {
              label: "dbz",
              url: "/dragonball",
            },
          ],
        },
        {
          title: "fairy tail",
          description: "Fairy Tail (フェアリーテイル, Fearī Teiru?, jeu de mots anglophone sur tale conte  et tail  queue) est un shōnen manga écrit et dessiné par Hiro Mashima. Il est prépublié dans l’hebdomadaire Weekly Shōnen Magazine de l éditeur Kōdansha entre le 2 août 2006 et le 26 juillet 2017 au Japon, et est compilé en un total de soixante-trois tomes. En France, en Suisse romande et en Belgique, le manga est publié en intégralité par Pika Édition entre le 10 septembre 2008 et le 27 juin 2018.",
          actions: [
            {
              label: "ft",
              url: "/fairytail",
            },
          ],
        }
      ]
     
      // Affichage d'un carousel dans le bot
      Crisp.message.show("carousel", {
        text: "Voici la liste des oeuvres :",
        targets: list,
      });}
    return(
        <>
        <h1> Page1</h1>
            <p>

            </p>
            <button onClick={showCaroosel}>Affichez le carousel</button>
        </>
    );
}