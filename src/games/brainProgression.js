import gameLoop, { genRange, randomNumber } from '../index.js';

export default function progressionGame() {
  const config = {
    wrong: "Wrong answer! Use only Int number format like '25' or '13'!",
    correct: 'Correct!',
    incorrect: (answer, rightAnswer, name) => `'${answer}' is wrong answer ;(. Correct answer was '${rightAnswer}'.\nLet's try again, ${name}!`,
  };
  const genQuestion = () => {
    const progression = genRange(5, 12);
    const len = progression.length;
    const ind = randomNumber(0, len - 1);
    const rightAnswer = progression[ind];
    const qProgression = [...progression];
    qProgression[ind] = '..';
    const question = `What number is missing in the progression?\nQuestion: ${qProgression.join(' ')}\nYour answer: `;

    const checkAnswer = (answer) => {
      const answerInt = parseInt(answer.trim(), 10);
      const status = answerInt === rightAnswer;
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
