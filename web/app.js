async function login() {
  const code = document.getElementById('code').value;
  const name = document.getElementById('name').value;

  const res = await fetch('https://quiz-patente.onrender.com/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ code, name })
  });

  const data = await res.json();

  startExam();
}

async function startExam() {
  const res = await fetch('https://quiz-patente.onrender.com/exam/B');
  const data = await res.json();

  let current = 0;
  let errors = 0;

  function show() {
    const q = data.questions[current];

    document.body.innerHTML = `
      <h2>${q.question}</h2>
      <button onclick="answer(true)">VERO</button>
      <button onclick="answer(false)">FALSO</button>
      <p>Errori: ${errors}</p>
    `;
  }

  window.answer = (choice) => {
    if (choice !== data.questions[current].correct) errors++;

    current++;

    if (current >= data.questions.length) {
      document.body.innerHTML = `<h1>Fine! Errori: ${errors}</h1>`;
    } else {
      show();
    }
  };

  show();
}
