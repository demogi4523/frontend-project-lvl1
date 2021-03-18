import readlineSync from 'readline-sync';

export function startGame() {
  console.log('Welcome to the Brain Games!');
  const name = readlineSync.question('May I have your name? ');
  console.log(`Hello, ${name}!`);
  return name;
}

export function isPrime(n) {
  if (n < 2) {
    throw new Error('n must be Int >= 2');
  }
  let cur = 2;
  while (cur * cur <= n) {
    if (n % cur === 0) {
      return false;
    }
    cur += 1;
  }
  return true;
}

export function gcd(a, b) {
  if (a === b) {
    return a;
  }
  const k1 = a > b ? a : b;
  const k2 = a < b ? a : b;
  if (k1 % k2 === 0) {
    return k2;
  }
  return gcd(k2, k1 % k2);
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

export default function gameLoop(genQuestion, canMistake = true, toWin = 3, config) {
  // Приветствие
  const name = startGame();
  // Вопрос/ответ
  const { wrong, correct, incorrect } = config;
  let ctr = 0;
  while (ctr < toWin) {
    const { question, checkAnswer } = genQuestion();
    const answerStr = readlineSync.question(question);
    if (answerStr === null) {
      console.log(wrong);
      ctr = 0;
      if (!canMistake) {
        return;
      }
    } else {
      const { answer, rightAnswer } = checkAnswer(answerStr);
      if (answer) {
        ctr += 1;
        console.log(correct);
      } else {
        ctr = 0;
        console.log(incorrect(answerStr, rightAnswer, name));
        if (!canMistake) {
          return;
        }
      }
    }
  }
  // Поздравление
  console.log(`Congratulations, ${name}!`);
}
