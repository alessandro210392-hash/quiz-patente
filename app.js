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

  startTimer();
  showQuestion();
}

function startTimer() {
  state.interval = setInterval(() => {
    state.time--;

    document.getElementById('timer').innerText =
      "Tempo: " + state.time;

    if (state.time <= 0) finish();
  }, 1000);
}

function showQuestion() {
  const q = state.questions[state.current];

  document.body.innerHTML = `
    <h3 id="timer">Tempo: ${state.time}</h3>
    <h2>${q.question}</h2>
    <button onclick="answer(true)">VERO</button>
    <button onclick="answer(false)">FALSO</button>
    <p>Errore: ${state.errors}</p>
    <p>Domanda ${state.current + 1}/${state.questions.length}</p>
  `;
}

function answer(choice) {
  if (choice !== state.questions[state.current].correct) {
    state.errors++;
  }

  state.current++;

  if (state.current >= state.questions.length) {
    finish();
  } else {
    showQuestion();
  }
}

function finish() {
  clearInterval(state.interval);

  document.body.innerHTML = `
    <h1>Esame finito</h1>
    <h2>Errori: ${state.errors}</h2>
  `;
}
