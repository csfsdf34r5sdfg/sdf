const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://coraq:Minimum90@cluster0.vhjnf8t.mongodb.net/?retryWrites=true&w=majority";



const express = require('express');
const app = express();
const port = 80; // Možete promijeniti na željeni port

// Postavite direktorij za statičke datoteke (npr. CSS, JavaScript, slike)
app.use(express.static('public'));

// Definirajte rutu za prikazivanje HTML stranice


// Nova ruta za "/save"
app.get('/save', (req, res) => {
  async function connectAndClose() {
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      console.log("Connected to MongoDB");
  
      // Ovdje možete izvoditi operacije na bazi podataka
      const collection = client.db("fullapp").collection("users");
  
      // Find all documents in the "users" collection
      const cursor = collection.find();
  
      // Iterate through the cursor and print each document
      await cursor.forEach(document => {
        if (document.first_name === "Dario") {
          res.send(document);
          console.log(document);
        }
        
      });
  
    } finally {
      await client.close();
      console.log("Disconnected from MongoDB");
    }
  }
  
  connectAndClose().catch(console.error);
});

// Pokrenite server na odabranom portu
app.listen(port, () => {
  console.log(`Server je pokrenut na http://localhost:${port}`);
});

