import readlineSync from 'readline-sync';

import startGame from './cli.js';

function randomNumber(min = 1, max = 20) {
  const delta = max - min;
  return Math.trunc(Math.random() * delta) + min;
}

export default function game() {
  const name = startGame();
  console.log('Answer "yes" if the number is even, otherwise answer "no".');
  let ctr = 0;
  while (ctr < 3) {
    const num = randomNumber();
    const isEven = num % 2 === 0;
    console.log(`Question: ${num}`);
    const ansStr = readlineSync.question('Your answer: ');
    if (ansStr !== 'yes' && ansStr !== 'no') {
      ctr = 0;
      console.log("Wrong answer! Use only 'yes' or /'no'");
    } else {
      let ans;
      if (ansStr === 'yes') {
        ans = isEven === true;
      } else {
        ans = isEven === false;
      }
      if (ans) {
        ctr += 1;
        console.log('Correct!');
      } else {
        ctr = 0;
        const correctAnsStr = isEven ? 'yes' : 'no';
        console.log(`'${ansStr}' is wrong answer ;(. Correct answer was '${correctAnsStr}'.`);
        console.log(`Let's try again, ${name}!`);
      }
    }
  }
  console.log(`Congratulations, ${name}!`);
}
