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

  renderLayout();
  startTimer();
  showQuestion();
}

function renderLayout() {
  document.body.innerHTML = `
    <div class="topbar">
      <div id="timer">Tempo: ${state.time}</div>
      <div id="errors">Errori: 0</div>
      <div id="progress">1/${state.questions.length}</div>
    </div>
    <div class="container">
      <div class="question" id="question"></div>
      <button class="btn true" onclick="answer(true)">VERO</button>
      <button class="btn false" onclick="answer(false)">FALSO</button>
    </div>
  `;
}

function startTimer() {
  state.interval = setInterval(() => {
    state.time--;
    document.getElementById('timer').innerText = "Tempo: " + state.time;

    if (state.time <= 0) finish();
  }, 1000);
}

function showQuestion() {
  const q = state.questions[state.current];

  document.getElementById('question').innerText = q.question;
  document.getElementById('progress').innerText =
    `${state.current + 1}/${state.questions.length}`;
}

function answer(choice) {
  if (choice !== state.questions[state.current].correct) {
    state.errors++;
  }

  document.getElementById('errors').innerText =
    "Errori: " + state.errors;

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
    <div class="container">
      <h1>Esame terminato</h1>
      <h2>Errori: ${state.errors}</h2>
    </div>
  `;
}
