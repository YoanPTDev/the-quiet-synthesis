-- USER COLLECTION
{
  "_id": ObjectId
  "username": string
  "email": string
  "password": string
}

-- GAME COLLECTION 
{
  "_id": ObjectId
  "createdBy": ObjectId referencing User Collection
  "players": Array of ObjectIds referencing User Collection
  "createdOn": date
  "adventureLog": ObjectId referencing AdventureLog Collection
  "deck": ObjectId referencing Deck Collection
}

-- ADVENTURELOG COLLECTION
{
  "_id": ObjectId
  "mapName": string
  "mapImage": string (base64 encoded)
  "weeks": Array of Objects
  [
    "weekNb": number
    "player": ObjectId referencing User Collection
    "cardDrawn": ObjectId referencing Cards Collection
    "promptChosen": number
    "actions": Array of Objects
    [
      "type": string 
      "tokens": Array of ObjectIds referencing Users
      "turnsLeft": number (optional)
      "coordinates": Object(X and Y axis) (optional)
      "image": ObjectId referencing Images Collection (optional)
      "description": text
    ]
  ]
}

-- DECK COLLECTION 
{
  "_id": ObjectId
  "name": string
  "cards": Array of ObjectIds referencing Cards Collection
}

--CARD COLLECTION
{
  "_id": ObjectId
    "suit": string                  --Hearts, Diamonds, Clovers, Spades
    "season": string                --Spring, Summer, Fall, Winter
    "value": string,                --A, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K
    "prompts": Array of Objects
    [
      "description": text
      "mechanic": string            --pause projects, complete project, prolong project, modify project, remove POI, modify ressource, discard cards, end turn, end game 
    ]                               --start project, discussion, discovery, lore
}

--IMAGES COLLECTION
{
  "_id": ObjectId
  "image": string (base64 encoded)
}

