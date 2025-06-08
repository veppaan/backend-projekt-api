**Vera Kippel veki2400**

Ett API byggt med express. 
API:et hanterar måltider för företaget Voff-Truck

Tabellens namn heter "meals" som skapats med hjälp av MongoDB och mongoose.
Tabellens innehåll:
- _id
- mealname(string)
- ingredients [string]
- category(string)
- created(Date)


Användning:

|Metod | Ändpunkt | Beskrivning |
-------|----------|-------------|
|GET | "/" | Visar ett välkomstmeddelande|
|GET | "/api" | Visar ett välkomstmeddelande|
|GET | "/meals" | Hämta alla lagrade måltider|
|GET| "/starters" | Hämta alla förrätter |
|GET| "/main-courses" | Hämta alla huvudrätter |
|GET| "/desserts" | Hämta alla efterrätter |
|GET | "/meals/:id" | Hämtar en specifik måltid med angivet id|
|POST | "/meals" | Lägger till en måltid|
|PUT | "/meals/:id" | Uppdaterar en måltid med angivet id|
|DELETE | "/meals/:id" | Radera en måltid med angivet id|

Måltidens JSON-struktur kan se ut såhär:
```json
{
    "mealname": "Kokosdrink",
    "ingredients": ["Kokos", "Laktosfri mjölk", "Gelatin"],
    "category": "Förrätt"
}