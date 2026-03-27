async function startExam() {
  const res = await fetch('https://quiz-patente.onrender.com/exam/B');
  const data = await res.json();

  let current = 0;
  let errors = 0;
  let time = 1200;

  const interval = setInterval(() => {
    time--;
    document.getElementById('timer').innerText = "Tempo: " + time;

    if (time <= 0) {
      clearInterval(interval);
      end();
    }
  }, 1000);

  function show() {
    const q = data.questions[current];

    document.body.innerHTML = `
      <h3 id="timer">Tempo: ${time}</h3>
      <h2>${q.question}</h2>
      <button onclick="answer(true)">VERO</button>
      <button onclick="answer(false)">FALSO</button>
      <p>Errori: ${errors}</p>
    `;
  }

  function end() {
    document.body.innerHTML = `<h1>Fine! Errori: ${errors}</h1>`;
  }

  window.answer = (choice) => {
    if (choice !== data.questions[current].correct) errors++;

    current++;

    if (current >= data.questions.length) {
      end();
    } else {
      show();
    }
  };

  show();
}
