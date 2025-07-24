var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




// Connexion avec la base de donnees 
const { Client } = require('pg');
const connectionString = 'postgres://avnadmin:AVNS_ZU5lZC7ueI-Htheht2S@pg-d96302e-romain-6a10.e.aivencloud.com:24295/defaultdb?sslmode=require';

const client = new Client({ connectionString });
client.connect();


// Route GET /tickets -> pour recuperer la totalite des donnees 
router.get('/tickets', async (req, res) => {
  try {
    const { rows } = client.query('SELECT * FROM tickets');
    res.json({ result: true, tickets: rows });
} catch (e) {
  console.error(e.stack);
  res.status(500).json({ result: false, error: "Internaal error" });
}
});


// Pour recuperer le resultat d'une recheche 
router.get('/search/:departure/:arrival/:date', async (req, res) => {
  try {
    const { departure, arrival, date } = req.params;
    const { row } = await client.query('SELECT * FROM tickets WHERE departure=$1 AND arrival=$2 AND date=$3', [departure, arrival, date]);
    return res.json({ result: true, ticket: row});
  } catch (e) {
    console.error(e.stack);
    return res.status(400).json({ result: false, error: "No result found" });
  }
});

module.exports = router;