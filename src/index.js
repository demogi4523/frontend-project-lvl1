import readlineSync from 'readline-sync';

export function startGame() {
  console.log('Welcome to the Brain Games!');
  const name = readlineSync.question('May I have your name? ');
  console.log(`Hello, ${name}!`);
  return name;
}

function mathRound(n) {
  const cStr = n.toString().split('.')[0];
  const c = parseInt(cStr, 10);
  if (n - c >= 0.5) {
    return c + 1;
  }
  return c;
}

export function randomNumber(min = 1, max = 20) {
  const delta = max - min;
  return mathRound(Math.random() * delta) + min;
}

export default function gameLoop(genQuestion, canMistake = true, toWin = 3) {
  // Приветствие
  const name = startGame();
  // Вопрос/ответ
  let ctr = 0;
  while (ctr < toWin) {
    const { question, checkAnswer } = genQuestion();
    const answerStr = readlineSync.question(question);
    if (answerStr === null) {
      console.log("Wrong answer! Use only Int number format like '25' or '13'!");
      ctr = 0;
      if (!canMistake) {
        return;
      }
    } else {
      const { answer, rightAnswer } = checkAnswer(answerStr);
      if (answer) {
        ctr += 1;
        console.log('Correct!');
      } else {
        ctr = 0;
        console.log(`'${answerStr}' is wrong answer ;(. Correct answer was '${rightAnswer}'.`);
        console.log(`Let's try again, ${name}!`);
        if (!canMistake) {
          return;
        }
      }
    }
  }
  // Поздравление
  console.log(`Congratulations, ${name}!`);
}
