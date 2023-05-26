/*
server/modules/week.js
La classe représentant le contenu d'une semaine (un tour dans le contexte du jeu)
Raphael Lavoie (auteur)
Nicolas Drolet
Yoan Poulin Truchon
*/

class Week {
  static build(nbWeek, pID, cardID, prompt) {
    let newWeek = {
      weekNb: nbWeek,
      playerId: pID,
      cardIdDrawn: cardID,
      promptChosen: prompt,
      actions: [],
      completedProjects: [],
    };

    return newWeek;
  }
}

export default Week;
