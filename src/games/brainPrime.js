import gameLoop, { isPrime, randomNumber } from '../index.js';

export default function brainPrime() {
  const config = {
    wrong: "Wrong answer! Use only 'yes' or /'no'",
    correct: 'Correct!',
    incorrect: (answerStr, rightAnswer, name) => `'${answerStr}' is wrong answer ;(. Correct answer was '${rightAnswer}'.\nLet's try again, ${name}!`,
  };

  const genQuestion = () => {
    const num = randomNumber(2, 150);
    const rightAnswer = isPrime(num);
    const question = `Answer "yes" if given number is prime. Otherwise answer "no".\nQuestion: ${num}\nYour answer: `;
    const checkAnswer = (answer) => {
      const ans = answer.trim();
      const prime = rightAnswer ? 'yes' : 'no';
      const status = ans === prime;
      return {
        answer: status,
        rightAnswer,
      };
    };

    return {
      question,
      checkAnswer,
    };
  };
  gameLoop(genQuestion, false, 3, config);
}
