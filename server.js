const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let db = JSON.parse(fs.readFileSync(__dirname + '/db.json'));

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
  const questions = db.questions.sort(() => 0.5 - Math.random());

  res.json({
    questions: questions.slice(0, 10),
    config: { maxErrors: 3 }
  });
});

const PORT = process.env.PORT || 3001;
