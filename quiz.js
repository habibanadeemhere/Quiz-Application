
const quiz = [
  { q: "1. Who created JavaScript?", options: ["Brendan Eich", "Bill Gates", "James Gosling", "Elon Musk"], answer: 0 },
  { q: "2. Which company developed JavaScript?", options: ["Netscape", "Microsoft", "Google", "IBM"], answer: 0 },
  { q: "3. Which symbol is used for comments?", options: ["//", "#", "/* */", "<!-- -->"], answer: 0 },
  { q: "4. What is typeof 'Hello'?", options: ["number", "string", "boolean", "object"], answer: 1 },
  { q: "5. What keyword declares a variable?", options: ["int", "var", "let", "string"], answer: 2 },
  { q: "6. What is 2 + '2'?", options: ["4", "22", "NaN", "Error"], answer: 1 },
  { q: "7. Which function shows a message?", options: ["msg()", "alert()", "prompt()", "console.log()"], answer: 1 },
  { q: "8. What does DOM stand for?", options: ["Data Object Model", "Document Object Model", "Display Object Manager", "Desktop Object Mode"], answer: 1 },
  { q: "9. How to write 'Hello' in alert box?", options: ["alertBox('Hello')", "msg('Hello')", "alert('Hello')", "prompt('Hello')"], answer: 2 },
  { q: "10. Which is not a JS data type?", options: ["string", "boolean", "float", "undefined"], answer: 2 },
  { q: "11. Which keyword stops a loop?", options: ["stop", "break", "exit", "quit"], answer: 1 },
  { q: "12. How to call a function named test?", options: ["call test()", "test()", "callFunction test", "run test()"], answer: 1 }
];


let index = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultBox = document.getElementById("resultBox");


function showQuestion() {
  let data = quiz[index];
  questionEl.innerText = data.q;
  optionsEl.innerHTML = "";

  for (let i = 0; i < data.options.length; i++) {
    let btn = document.createElement("button");
    btn.className = "option";
    btn.innerText = data.options[i];
    btn.onclick = function () { checkAnswer(i); };
    optionsEl.appendChild(btn);
  }
}


function checkAnswer(selected) {
  if (selected === quiz[index].answer) {
    score++;
  }
  index++;
  if (index < quiz.length) {
    showQuestion();
  } else {
    showResult();
  }
}


function nextQuestion() {
Swal.fire('Oops!', 'Please select an answer 😅', 'warning');

}


function showResult() {
  questionEl.style.display = "none";
  optionsEl.style.display = "none";
  document.getElementById("nextBtn").style.display = "none";

  let pass = score >= 8;
  let emoji = pass ? "🎉" : "😢";
  let message = pass ? "Congrats! You Passed!" : "Oops! You Failed!";

  resultBox.innerHTML = `
    <h2>${emoji}</h2>
    <p>${message}</p>
    <p>You got <strong>${score}</strong> out of ${quiz.length}</p>
    <button class="restart" onclick="restartQuiz()">Restart Quiz 🔁</button>
  `;


  startFalling(pass);
}


function restartQuiz() {
  index = 0;
  score = 0;
  questionEl.style.display = "block";
  optionsEl.style.display = "block";
  document.getElementById("nextBtn").style.display = "block";
  resultBox.innerHTML = "";
  document.querySelectorAll(".particle").forEach(p => p.remove());
  showQuestion();
}


function startFalling(isPass) {
  const emojis = isPass ? ["🎉", "✨", "💫", "🎊", "🌟"] : ["😢", "💔", "💢", "😭", "😞"];
  const count = 30;

  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.classList.add("particle");
    span.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDuration = (3 + Math.random() * 3) + "s";
    document.body.appendChild(span);

    setTimeout(() => span.remove(), 6000);
  }
}

showQuestion();





document.addEventListener("mousemove", function(e) {
  let ring = document.createElement("div");
  ring.classList.add("ring");
  ring.style.left = e.pageX - 10 + "px";
  ring.style.top = e.pageY - 10 + "px";
  document.body.appendChild(ring);
  
  setTimeout(() => ring.remove(), 1000);
});









