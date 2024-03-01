 let score = 
 JSON.parse(localStorage.getItem('score')) || 
  {
   wins:0,
   losses:0,
   ties:0
  };

  updateScore();
 // creating autoPlay functionality
  let isAutoPlay = false;
  let intervalId;
  function autoPlay() {
  if(!isAutoPlay){
   intervalId = setInterval(() => {
    const playerMove = pickComputerMove();
    playGame(playerMove);
    },1000);
    isAutoPlay = true; 
  }
  else if(isAutoPlay) {
    clearInterval(intervalId);
    //  intervalId = null;
    isAutoPlay = false; 
   }
  }
  // adding event listeners to  buttons

   document.querySelector('.js-rock-button').addEventListener('click',() => {
   playGame('Rock');
  })

   document.querySelector('.js-paper-button').addEventListener('click',() => {
   playGame('Paper');
  })

   document.querySelector('.js-scissors-button').addEventListener('click',() => {
   playGame('Scissors');
  })

   document.querySelector('.js-reset-button').addEventListener('click',() => {
   reset();
  });

  function reset(){
   document.querySelector('.js-reset-display').innerHTML = `Are you sure you want to reset the score ? <button onclick="
   resetScore();
   hideReset();
   ">Yes</button> <button onclick="
   hideReset();
   ">No</button>`;
  }

   function hideReset(){
    document.querySelector('.js-reset-display').innerHTML = '';
   }

  const autoPlayButton = document.querySelector('.js-auto-play');
  autoPlayButton.addEventListener('click',() => {
  if(autoPlayButton.innerHTML === 'AutoPlay'){
    autoPlayButton.innerHTML = 'Stop Playing';
  } else {
    autoPlayButton.innerHTML = 'AutoPlay';
  }
  autoPlay();
 });
  
  // making keydown event to play the game using  keyboard
  document.body.addEventListener('keydown', function(event) {
  if(event.key === 'r'){
    playGame('Rock');
  } else if(event.key === 'p'){
    playGame('Paper');
  } else if(event.key === 's'){
    playGame('Scissors');
  } else if (event.key === 'Backspace'){
     reset();
  } else if(event.key === 'a'){
    autoPlay();
  } else if(event.key === 'y'){
    resetScore();
    hideReset();
  } else if(event.key === 'n'){
    hideReset();
  }
 })

 //creating the resetScore function so that we can use wherever we want  
 function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScore();
 } 

 function playGame(playerMove){
 const computerMove = pickComputerMove();
 let result = '';  

 if(playerMove === 'Scissors'){
 if(computerMove === 'Rock'){
 result = 'You lose';
 } else if(computerMove === 'Paper'){
 result = 'You win';
 } else if(computerMove === 'Scissors') {
 result = 'Tie';
 }

 } else if(playerMove === 'Paper'){
 if(computerMove === 'Rock'){
  result = 'You win';
 } else if(computerMove === 'Paper'){
  result = 'Tie';
 } else if(computerMove === 'Scissors') {
  result = 'You lose';
 }

 } else if (playerMove === 'Rock') {
 if(computerMove === 'Rock'){
  result = 'Tie';
 } else if(computerMove === 'Paper'){
  result = 'You lose';
 } else if(computerMove === 'Scissors') {
  result = 'You win';
 } 
}     

 document.querySelector('.js-result').innerHTML = result;


 if(result === 'You win'){
    score.wins+= 1;
 } else if (result === 'You lose') {
    score.losses+= 1;
 } else if (result === 'Tie') {
    score.ties+= 1;
 }

 updateScore();

 localStorage.setItem('score', JSON.stringify(score));

 document.querySelector('.js-moves').innerHTML = `You
 <img src="images/${playerMove}-emoji.png">
 <img src="images/${computerMove}-emoji.png"> Computer.`;
 }
 function updateScore() {
 document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
 }
 function pickComputerMove(){
 const randomNumber = Math.random();
 let computerMove = '';
  if(randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'Rock';
  } else if(randomNumber >= 1 / 3 && randomNumber < 2 / 3){
    computerMove = 'Paper';
  } else if(randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'Scissors';
  }    
 return computerMove;     
 }