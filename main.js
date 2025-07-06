function getUserChoice() {
  let userChoice = '';

  while (true) {
    userChoice = prompt('Enter your choice: ', '');

    if (
      userChoice === 'rock' ||
      userChoice === 'paper' ||
      userChoice === 'scissors'
    ) {
      break;
    }

    console.log('incorrect input!\n\n');
  }

  return userChoice;
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
    result =
      isUserWinning(userChoice, computerChoice) === true ? 'user' : 'computer';
  }

  return result;
}

let userScore = 0;
let computerScore = 0;

function playGame() {
  for (let currentRound = 1; currentRound <= 5; currentRound++) {
    let userChoice = getUserChoice();
    let computerChoice = getComputerChoice();

    let roundWinner = playRound(userChoice, computerChoice);

    // Track score

    if (roundWinner === 'user') {
      userScore++;
    } else if (roundWinner === 'computer') {
      computerScore++;
    } else {
      // if we want to add to both scores
      // userScore++;
      // computerScore++;
    }

    // Displaying info
    displayRoundInfo(currentRound, roundWinner, userChoice, computerChoice);
  }

  return userScore === computerScore
    ? 'tie'
    : userScore > computerScore
    ? 'user'
    : 'computer';
}

function displayRoundInfo(currentRound, winner, userChoice, computerChoice) {
  let winnerMessage =
    winner === 'user' ? `beats` : winner === 'computer' ? `loses to` : 'equals';

  console.log(
    `Round #${currentRound} < Score: ${userScore} - ${computerScore} >`
  );

  console.log(
    'Choices -> user: ' + userChoice + ' computer: ' + computerChoice
  );

  console.log(
    `${winner} ${
      winner !== 'tie' ? 'wins ' : ''
    }! [${userChoice} ${winnerMessage} ${computerChoice}]` + '\n\n'
  );
}

let gameResult = playGame();

console.log(`\n\n\nGame result: ${gameResult}\n\n\n`);
