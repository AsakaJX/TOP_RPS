function getUserChoice(event) {
  const btnId = String(event.target.id);
  const choice = btnId.substring(btnId.indexOf('-') + 1);

  return choice;
}

function getComputerChoice() {
  let computerChoice = Math.floor(Math.random() * 3) + 1;

  return computerChoice == 1
    ? 'rock'
    : computerChoice == 2
    ? 'paper'
    : 'scissors';
}

function isUserWinning(userChoice, computerChoice) {
  if (userChoice === 'rock') {
    return computerChoice === 'scissors' ? true : false;
  } else if (userChoice === 'paper') {
    return computerChoice === 'rock' ? true : false;
  } else {
    return computerChoice === 'paper' ? true : false;
  }
}

function playRound(userChoice, computerChoice) {
  let result = 'tie';

  if (userChoice !== computerChoice) {
    result = isUserWinning(userChoice, computerChoice) === true ? 'user' : 'ai';
  }

  return result;
}

let userScore = +document.querySelector('game-score-user');
let computerScore = +document.querySelector('game-score-computer');

const choiceButton = document.querySelector('.user-input-container');
choiceButton.addEventListener('click', playGame);

let roundCount = 0;

let gameWinner = '';

function resetGame() {
  gameWinner = '';
  roundCount = 0;
  computerScore = 0;
  userScore = 0;
}

function playGame(userChoiceButtonEvent) {
  roundCount++;

  let userChoice = getUserChoice(userChoiceButtonEvent);
  let computerChoice = getComputerChoice();

  let roundWinner = playRound(userChoice, computerChoice);

  // Track score

  if (roundWinner === 'user') {
    userScore++;
  } else if (roundWinner === 'ai') {
    computerScore++;
  } else {
    // if we want to add to both scores
    // userScore++;
    // computerScore++;
  }

  // Had to move the gameWinner dicision here, it's not really right place to do so,
  // but it doesn't messes up with the final product, so... Imma leave it for now.
  //
  // The problem was I was assigning it after the displayRoundInfo was called,
  // so there was no information about the gameWinner at that point.
  gameWinner =
    userScore === computerScore
      ? 'tie'
      : userScore > computerScore
      ? 'user'
      : 'ai';

  // Displaying info
  displayRoundInfo(roundWinner);

  if (roundCount === 5) {
    resetGame();
  }
}

function displayRoundInfo(roundWinner) {
  const userCounter = document.querySelector('#game-score-user');
  const computerCounter = document.querySelector('#game-score-computer');

  userCounter.textContent = userScore;
  computerCounter.textContent = computerScore;

  const userCard = document.querySelector('.game-choice-user');
  const computerCard = document.querySelector('.game-choice-computer');

  const resultPlaceholder = document.querySelector('.result-placeholder');

  const resultText =
    roundCount !== 5
      ? `Round winner: ${roundWinner}`
      : `Game winner: ${gameWinner}`;

  resultPlaceholder.textContent = resultText;

  switch (roundWinner) {
    case 'user':
      userCard.style.border = `2px dotted oklch(0.7 0.06 160)`;
      computerCard.style.border = ``;
      break;

    case 'ai':
      computerCard.style.border = `2px dotted oklch(0.7 0.06 160)`;
      userCard.style.border = ``;
      break;

    default:
      computerCard.style.border = `2px dotted oklch(0.56 0.1 296)`;
      userCard.style.border = `2px dotted oklch(0.56 0.1 296)`;
      break;
  }
}
