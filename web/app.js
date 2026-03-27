let state = {};

async function login() {
  const mode = document.getElementById('mode').value;

  await fetch('https://quiz-patente.onrender.com/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ code: "TEST123", name: "Mario" })
  });

  startExam(mode);
}

  startExam();
}

async function startExam(mode) {
  const res = await fetch('https://quiz-patente.onrender.com/exam/B');
  const data = await res.json();

  state = {
    current: 0,
    errors: 0,
    time: data.config.time,
    questions: data.questions,
    mode: mode
  };

  render();
  timer();
}

  render();
  timer();
}

function render() {
  const q = state.questions[state.current];

  document.getElementById('app').innerHTML = `
    <div class="app">

      <div class="sidebar">
        <div>
          <div class="card">Postazione - AB123</div>

          <div class="card">
            <b>Mario Rossi</b><br>
            Esame Patente B
          </div>

          <div class="card">
            Tempo
            <div class="timer" id="timer">${state.time}</div>
          </div>
        </div>

        <div class="card">Ministero Trasporti</div>
      </div>

      <div class="main">

        <div class="top">
          <div>Domanda ${state.current + 1} / ${state.questions.length}</div>
          <div>Errori: ${state.errors}</div>
        </div>

        <div class="question">${q.question}</div>

        <div class="image">
          ${q.image ? `<img src="${q.image}" width="200">` : ''}
        </div>

        <div class="answers">
          <button class="btn" onclick="answer(true)">V</button>
          <button class="btn" onclick="answer(false)">F</button>
        </div>

        <div class="footer">
          ${state.questions.map((_, i) => `
            <button class="nav-btn ${i === state.current ? 'active' : ''}" onclick="go(${i})">
              ${i + 1}
            </button>
          `).join('')}
        </div>

      </div>
    </div>
  `;
}

function timer() {
  setInterval(() => {
    state.time--;
    document.getElementById('timer').innerText = state.time;

    if (state.time <= 0) finish();
  }, 1000);
}

function answer(val) {
function answer(val) {
  if (val !== state.questions[state.current].correct) {
    state.errors++;
  }

 
  next();
}

function next() {
  if (state.current < state.questions.length - 1) {
    state.current++;
    render();
  } else {
    finish();
  }
}

function go(i) {
  state.current = i;
  render();
}

function finish() {
  document.getElementById('app').innerHTML = `
    <div style="text-align:center; margin-top:100px;">
      <h1>Esame terminato</h1>
      <h2>Errori: ${state.errors}</h2>
    </div>
  `;
}

window.onload = () => {
  login();
};
