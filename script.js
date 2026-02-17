let currentTarget = 2;
let totalTaps = 0;
let incorrectTaps = 0;
let startTime;
let feedbackType = "";
let trialData = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateBoard() {
  const board = document.getElementById("gameBoard");
  board.innerHTML = "";

  let numbers = shuffle([...Array(20).keys()].map(x => x + 1));

  numbers.forEach(num => {
    let div = document.createElement("div");
    div.className = "number";
    div.innerText = num;
    div.onclick = () => handleTap(num);
    board.appendChild(div);
  });
}

function startGame(type) {
  feedbackType = type;
  currentTarget = 2;
  totalTaps = 0;
  incorrectTaps = 0;

  document.getElementById("results").innerHTML = "";

  // Hide buttons during trial
  document.getElementById("controls").style.display = "none";

  generateBoard();
  startTime = performance.now();
}

function handleTap(number) {
  totalTaps++;

  if (number === currentTarget) {
    giveFeedback();
    currentTarget += 2;

    if (currentTarget > 20) {
      endGame();
    }
  } else {
    incorrectTaps++;
  }
}

function giveFeedback() {
  if (feedbackType === "no feedback") {
  }

  if (feedbackType === "sound") {
    //let audio = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");
    let audio = new Audio("click.wav");
    audio.play();
  }
}

function endGame() {
  let endTime = performance.now();
  let completionTime = (endTime - startTime) / 1000;
  let accuracy = (totalTaps - incorrectTaps) / totalTaps;

  trialData.push({
    feedback: feedbackType,
    totalTaps,
    incorrectTaps,
    completionTime,
    accuracy
  });

  // Clear board
  document.getElementById("gameBoard").innerHTML = "";

  // Show results permanently
  document.getElementById("results").innerHTML = `
    <strong>Last Trial Results:</strong><br>
    Feedback: ${feedbackType}<br>
    Time: ${completionTime.toFixed(2)} seconds<br>
    Accuracy: ${(accuracy * 100).toFixed(1)}%
  `;

  // Show buttons again (return to start state)
  document.getElementById("controls").style.display = "block";
}

// function downloadData() {
//   let csv = "feedback,totalTaps,incorrectTaps,completionTime,accuracy\n";

//   trialData.forEach(row => {
//     csv += `${row.feedback},${row.totalTaps},${row.incorrectTaps},${row.completionTime},${row.accuracy}\n`;
//   });

//   let blob = new Blob([csv], { type: 'text/csv' });
//   let link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = "whack_even_data.csv";
//   link.click();
// }