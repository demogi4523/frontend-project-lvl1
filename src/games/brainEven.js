import gameLoop, { randomNumber } from '../index.js';

export default function evenGame() {
  const config = {
    wrong: "Wrong answer! Use only 'yes' or /'no'",
    correct: 'Correct!',
    incorrect: (answerStr, rightAnswer, name) => `'${answerStr}' is wrong answer ;(. Correct answer was '${rightAnswer}'.\nLet's try again, ${name}!`,
  };
  const genQuestion = () => {
    const num = randomNumber();
    const question = `Answer "yes" if the number is even, otherwise answer "no".\nQuestion: ${num}\nYour answer: `;
    const checkAnswer = (answer) => {
      const ansStr = answer.trim();
      const isEven = num % 2 === 0;
      const right = isEven === true ? 'yes' : 'no';
      let ans;
      if (ansStr === 'yes') {
        ans = isEven === true;
      } else {
        ans = isEven === false;
      }
      return {
        answer: ans,
        rightAnswer: right,
      };
    };

    return {
      question,
      checkAnswer,
    };
  };
  gameLoop(genQuestion, true, 3, config);
}
