const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'db.json');
let db = JSON.parse(fs.readFileSync(dbPath));

app.get('/', (req, res) => {
  res.send('Server funzionante');
});

// LOGIN
app.post('/login', (req, res) => {
  const { code, name } = req.body;

  const school = db.schools.find(s => s.code === code);
  if (!school) return res.status(404).send('Codice non valido');

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

  const config = {
    B: { total: 30, maxErrors: 3, time: 1200 },
    AM: { total: 30, maxErrors: 4, time: 1200 },
    C: { total: 40, maxErrors: 4, time: 1600 },
    D: { total: 40, maxErrors: 4, time: 1600 }
  };

  const questions = db.questions
    .filter(q => q.license === license)
    .sort(() => 0.5 - Math.random())
    .slice(0, config[license]?.total || 30);

  res.json({
    questions,
    config: config[license] || { total: 30, maxErrors: 3, time: 1200 }
  });
});

app.listen(process.env.PORT || 3001);
