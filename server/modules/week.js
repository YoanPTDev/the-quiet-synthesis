class Week {
  static build(nbWeek, pID, cardID, prompt) {
    let newWeek = {
      weekNb: nbWeek,
      playerId: pID,
      cardIdDrawn: cardID,
      promptChosen: prompt,
      actions: [],
      completedProjects: [], //{orgDesc: 'adawdwadwa', endDesc: 'dwadwadwadwa', orgPlayer: 'dwadwa', endPlayer: 'dwadwawa'}
    };

    return newWeek;
  }
}

export default Week;
