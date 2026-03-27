const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// percorso sicuro db
const dbPath = path.join(__dirname, 'db.json');

let db = { schools: [], users: [], questions: [] };

try {
  const data = fs.readFileSync(dbPath);
  db = JSON.parse(data);
} catch (err) {
  console.log('Errore lettura db.json:', err);
}

app.get('/', (req, res) => {
  res.send('Server funziona!');
});

// LOGIN
app.post('/login', (req, res) => {
  const { code, name } = req.body;

  const school = db.schools.find(s => s.code === code);
  if (!school) return res.status(404).send('Scuola non trovata');

  let user = db.users.find(u => u.name === name);

  if (!user) {
    user = { id: Date.now(), name };
    db.users.push(user);
  }

  res.json({ user, school });
});

// ESAME
app.get('/exam/:license', (req, res) => {
  const license = req.params.license;

  const questions = db.questions.filter(q => q.license === license);

  res.json({
    questions: questions.sort(() => 0.5 - Math.random()).slice(0, 30),
    config: { maxErrors: 3 }
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Server attivo su ' + PORT);
});
