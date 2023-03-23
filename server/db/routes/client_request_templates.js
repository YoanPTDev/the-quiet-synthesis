import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 

//TO-DO: définir comment on obtient le id du adventure log: soit par 
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