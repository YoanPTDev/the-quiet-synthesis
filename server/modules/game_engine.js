class GameEngine {
    constructor(game, notebook, deck, players, map, log) {
        this.game = game;   // Objet Game
        this.notebook = notebook;   // Objet Notebook
        this.deck = deck;   // Objet Deck
        this.players = players; // Liste de Player
        this.map = map;     // Objet Map
        this.log = log;     // Objet AdventureLog
        this.gameId = 1;    // ID de la partie (encore necessaire?)
        this.timeElapsed = 0;   // Sert a calculer le temps passé pour la sauvegarde
        this.nbrContempts = 0;  // Nombre de contempt tokens
        this.reduceTimers = false;  // Determine si on reduit les projets durant le tour
    }

    processTurn = () => {
        
    }
}
