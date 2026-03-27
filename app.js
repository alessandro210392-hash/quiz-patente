let state = {};

async function login() {
  const code = document.getElementById('code').value;
  const name = document.getElementById('name').value;

  await fetch('https://quiz-patente.onrender.com/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ code, name })
  });

  startExam();
}

async function startExam() {
  const res = await fetch('https://quiz-patente.onrender.com/exam/B');
  const data = await res.json();

  state = {
    current: 0,
    errors: 0,
    time: data.config.time,
    questions: data.questions
  };

  render();
  timer();
}

function render() {
  document.body.innerHTML = `
    <div class="header">
      <div id="timer">Tempo: ${state.time}</div>
      <div id="errors">Errori: ${state.errors}</div>
      <div id="progress">${state.current + 1}/${state.questions.length}</div>
    </div>

    <div class="main">
      <div class="question">${state.questions[state.current].question}</div>

      <div class="answers">
        <button class="btn vero" onclick="answer(true)">VERO</button>
        <button class="btn falso" onclick="answer(false)">FALSO</button>
      </div>
    </div>
  `;
}

function timer() {
  setInterval(() => {
    state.time--;
    document.getElementById('timer').innerText = "Tempo: " + state.time;

    if (state.time <= 0) finish();
  }, 1000);
}

function answer(val) {
  if (val !== state.questions[state.current].correct) {
    state.errors++;
  }

  state.current++;

  if (state.current >= state.questions.length) {
    finish();
  } else {
    render();
  }
}

function finish() {
  document.body.innerHTML = `
    <div class="main">
      <h1>Esame finito</h1>
      <h2>Errori: ${state.errors}</h2>
    </div>
  `;
}
