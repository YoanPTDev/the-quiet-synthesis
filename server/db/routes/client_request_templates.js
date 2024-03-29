// db/routes/client_request_templates.js

// Des méthodes qui devaient servir à une éventuelle implémentation d'une architecture REST.
// Finalement cette méthode de transfert de données entre serveur et BD a été remplacé assez
// tôt dans la conception pour faire place aux WebSockets, qui s'avéraient plus avantageux pour
// un projet moins demandant au niveau graphique mais qui nécessitait un temps de réponse plus
// rapide que REST. Je laisse le code ici pour témoignée d'une architecture qui ne fut jamais.

// Ces méthodes auraient été ceux utilisés du coté serveur pour communiquer avec le front-end et ses requetes

// Nicolas Drolet (auteur)
// Yoan Poulin Truchon
// Raphael Lavoie

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 

//TO-DO: définir comment on obtient le id du adventure log 
export default function GetAdvLog() {
 
  const [form, setForm] = useState({
    _id: "",
    mapName: "",
    mapImage: "",
    weeks: [],
  });

  const params = useParams();
  const navigate = useNavigate();
 
  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch("http://localhost:5000/game/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
      }).catch(error => {
        window.alert(error);
        return;
      });
 
      if (!response.ok) {
        const message = "An error has occurred: " + response.statusText;
        window.alert(message);
        return;
      }
 
      const advLog = await response.json();
      if (!advLog) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
 
      setForm(advLog);
    }
 
    fetchData();
 
    return;
  }, /*ce que tu mets ici va trigger useEffect lorsque ca change*/);
}