var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




// Connexion avec la base de donnees 
const { Client } = require('pg');
const connectionString = new Client({
connectionString: 'postgresql://neondb_owner:npg_h7rqO3NQtpuC@ep-wild-mountain-abc0qrca-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
ssl: { rejectUnauthorized: false }
});
const client = new Client( connectionString );
client.connect();


// Route GET /tickets -> pour recuperer la totalite des donnees 
router.get('/tickets', async (req, res) => {
  try {
    const { rows } = await client.query('SELECT * FROM tickets');
    res.json({ result: true, tickets: rows });
  } catch (e) {
    console.error(e.stack);
    res.status(500).json({ result: false, error: "Internal error" });
  } 
});


// Pour recuperer le resultat d'une recheche 
router.get('/search/:departure/:arrival/:date', async (req, res) => {
  try {
    const { departure, arrival, date } = req.params;
    const { rows } = await client.query('SELECT * FROM tickets WHERE departure=$1 AND arrival=$2 AND date::date=$3', [departure, arrival, date]);
    return res.json({ result: true, tickets: rows});
  } catch (e) {
    console.error(e.stack);
    return res.status(400).json({ result: false, error: "No result found" });
  }
});

module.exports = router;