// game function 

/* 
-   Player must guess a number between a min and max
-   Player gets a certain amount of guesses 
-   Notify player of guesses remaining 
-   notify the player the player the correct answer if loose
-   let player choose to play again 
*/
// parseInt(Math.random()*10+1)
let min = 1, 
    max = 10,
    winningNum = getRandom(min , max)     ;           
    guessesleft = 3; 
    
    // UI element 
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

    // Assign UI min and max 
    minNum.textContent = min; 
    maxNum.textContent = max;

    // play again event listener
    game.addEventListener('mousedown', function(e){
        if(e.target.className === 'btn play-again'){
          window.location.reload();
        }
    })

    // get winning number 
     function getRandom(min, max){
         return Math.floor(Math.random() * (max - min + 1) + min);
     }

    // listen guess 
    guessBtn.addEventListener('click' , function(){
        let guess = parseInt(guessInput.value);


        // Validate 
        if(isNaN(guess) || guess < min || guess > max){
            setMessage(`Please Enter A Number between ${min} and ${max}`, 'red');

        }
        // check if won 
        if(guess === winningNum){
            // // Disable input
            // guessInput.disabled = true ;
            // // change border Color 
            // guessInput.style.borderColor = 'pink';
            // setMessage(`${winningNum} is correct, you win` , 'pink');
            gameOver(true , `${winningNum} is Correct, You win`)
        }   else {
            guessesleft --;
             if (guessesleft === 0){
            // gameOver - lost 
            gameOver(false, `Game Over, you lost. The number was ${winningNum}`)
            // guessBtn.disabled = true;
        }   else {
            // Game continues - answer wrong 

            // change border color 
            guessInput.style.borderColor = 'red'; 
            // clear input 
            guessInput.value = '';

            // tell User its the wrong number 
            setMessage(`${guess} is not correct , you only have ${guessesleft} guesses left `, 'red')
            
        }
    }
    })

    function gameOver(won, msg) {
        let color;

        won === true ? color = 'green' : color = 'red' ;
        // disable input 
        guessInput.disabled = true; 
        // change border color
        guessInput.style.borderColor = 'green';
        // set color
        message.style.color = color; 
        // set message
        setMessage(msg);
        // play again
        guessBtn.value = 'Play Again?'
        guessBtn.className += ' play-again green'

    }

        // set message
    function setMessage(msg , color){
        message.style.color = color ; 
        message.textContent = msg   ;
    }