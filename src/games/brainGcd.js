import gameLoop, { gcd, randomNumber, isPrime } from '../index.js';

export default function gcdGame() {
  const config = {
    wrong: "Wrong answer! Use only Int number format like '25' or '13'!",
    correct: 'Correct!',
    incorrect: (answerStr, rightAnswer, name) => `'${answerStr}' is wrong answer ;(. Correct answer was '${rightAnswer}'.\nLet's try again, ${name}!`,
  };
  const getAllPrimeLessThan = (n) => {
    const primes = [];
    let cur = 2;
    while (cur < n) {
      if (isPrime(cur)) {
        primes.push(cur);
        cur += 2;
      } else {
        cur += 1;
      }
    }
    return primes;
  };
  const primes = getAllPrimeLessThan(20);
  // add 1 for case when first % second === 0
  primes.unshift(1);
  const len = primes.length;
  // firstPrime can be equal secondPrime or/and nod
  // gcd return right answer anyway
  const genQuestion = () => {
    const firstPrime = primes[randomNumber(0, len - 1)];
    const secondPrime = primes[randomNumber(0, len - 1)];
    const nod = primes[randomNumber(0, len - 1)];
    const first = firstPrime * nod;
    const second = secondPrime * nod;
    const question = `Find the greatest common divisor of given numbers.\nQuestion: ${first} ${second}\nYour answer: `;
    const checkAnswer = (answer) => {
      const answerInt = parseInt(answer.trim(), 10);
      const rightAnswerNum = gcd(first, second);
      const status = answerInt === rightAnswerNum;
      return {
        answer: status,
        rightAnswer: rightAnswerNum.toString(),
      };
    };

    return {
      question,
      checkAnswer,
    };
  };
  gameLoop(genQuestion, false, 3, config);
}
