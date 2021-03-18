import gameLoop, { randomNumber as genNumber } from '../index.js';

export default function calcGame() {
  const genQuestion = () => {
    const genOperation = () => {
      const set = ['+', '-', '*'];
      const position = genNumber(0, 2);
      return set[position];
    };
    const firstNumber = genNumber();
    const secondNumber = genNumber();
    const operation = genOperation();
    const question = `What is the result of the expression?\nQuestion: ${firstNumber} ${operation} ${secondNumber}\nYour answer: `;
    const checkAnswer = (answer) => {
      const answerNum = parseInt(answer.trim(), 10);
      let rightAnswerNum;
      switch (operation) {
        case '+':
          rightAnswerNum = firstNumber + secondNumber;
          break;
        case '-':
          rightAnswerNum = firstNumber - secondNumber;
          break;
        case '*':
          rightAnswerNum = firstNumber * secondNumber;
          break;
        default:
          throw new Error('Operation error!');
      }
      const status = answerNum === rightAnswerNum;
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
  gameLoop(genQuestion, false, 3);
}
