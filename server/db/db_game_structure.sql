-- GAME COLLECTION STRUCTURE
{
  "_id": ObjectId("<id>"),
  "deck": "John Doe",
  "age": 30,
  "email": "johndoe@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001"
  },
  "interests": ["reading", "hiking", "traveling"],
  "last_login": ISODate("2022-12-30T12:00:00Z")
}

-- DECK COLLECTION STRUCTURE
{
  "_id": ObjectId("<id>"),
  "name": "<Deck Name>",
  "cards": [
    {
      "_id": ObjectId("<id>"),
      "suit": "spade",
      "season": "summer",
      "value": "1",
      "prompts": [
        {
          "_id": ObjectId("<id>"),
          "description": "<Prompt Description>",
          "mechanic": "<mechanic name>"
        },
        {
          "_id": ObjectId("<id>"),
          "description": "<Prompt Description>",
          "mechanic": "<mechanic name>"
        }
      ]
    },
    {
      "_id": ObjectId("<id>"),      --Single prompt card example
      "suit": "heart",
      "season": "spring",
      "value": "King",
      "prompts": [
        {
          "_id": ObjectId("<id>"),
          "description": "<Prompt Description>",
          "mechanic": "<mechanic name>"
        }
      ]
    }
  ]
}

