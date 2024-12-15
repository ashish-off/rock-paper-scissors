const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

/*
if (!score) {
score = {
wins: 0,
losses: 0,
ties: 0
};
}
*/

let isAutoPlaying = false;
let intertvalId;

function autoPlay(){
  if(!isAutoPlaying){
  intertvalId = setInterval(() => {
    const playerMove = pickComputerMove();
    playGame(playerMove);

  }, 1000)
  isAutoPlaying = true;
}else{
  clearInterval(intertvalId);
  isAutoPlaying = false;
}}

document.querySelector('.js-auto-play-button')
.addEventListener('click', () => {
autoPlay();
});

updateScoreElement();

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
  playGame('Rock');
});


document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  playGame('Scissors');
});

document.body.addEventListener('keydown', (event)=> {
  if(event.key === 'r' || event.key === 'R'){
    playGame('Rock');
  } else if (event.key === 'p' || event.key === 'P'){
    playGame('Paper');
  }else if(event.key === 's'|| event.key === 'S'){
    playGame('Scissors');
  }else if(event.key === 'a' || event.key === 'A'){
    autoPlay();
  }else if(event.key === 'Backspace'){
    showResetConfirmation();
  }
});

document.querySelector('.js-reset-button')
.addEventListener('click', () => {
 showResetConfirmation();
});

function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function showResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = `
      Are you sure you want to reset the score?
      <button class="js-reset-confirm-yes reset-confirm-button">
        Yes
      </button>
      <button class="js-reset-confirm-no reset-confirm-button">
        No
      </button>
    `;

  document.querySelector('.js-reset-confirm-yes')
    .addEventListener('click', () => {
      resetScore();
      hideResetConfirmation();
    });
  
  document.querySelector('.js-reset-confirm-no')
    .addEventListener('click', () => {
      hideResetConfirmation();
    });
}

function hideResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = '';
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';
  if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You lose';
    } else if (computerMove === 'Paper') {
      result = 'You won';
    } else {
      result = 'Tie';
    }

  }

  else if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie';
    } else if (computerMove === 'Paper') {
      result = 'You lose';
    } else {
      result = 'You won';
    }
  }

  else {
    if (computerMove === 'Rock') {
      result = 'You won';
    } else if (computerMove === 'Paper') {
      result = 'Tie';
    } else {
      result = 'You lose';
    }
  }

  if (result === 'You won') {
    score.wins += 1;
  } else if (result === 'You lose') {
    score.losses += 1;
  } else if (result === 'Tie') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You 
<img src="images/${playerMove}-emoji.png" alt="" class="move-icon">
<img src="images/${computerMove}-emoji.png" alt="" class="move-icon">
Computer`;


}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'Paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'Scissors';
  }
  return computerMove;
}
