import { QuestionModel } from "../models/question";

export const colors = [
  "#7EDCF5",
  "#F58567",
  "#B0B3F5",
  "#F5A1EF",
  "#F4D061",
  "#24F5A9",
];

export function getRandomColors(count: number) {
  const randomColors: string[] = [];
  for (let i = 0; i < count; i++) {
    let randomColor;
    do {
      randomColor = colors[Math.floor(Math.random() * colors.length)];
    } while (randomColors.includes(randomColor));
    randomColors.push(randomColor);
  }
  return randomColors;
}

export function getRandomQuestions(questions: QuestionModel[], count: number) {
  const randomQuestions: QuestionModel[] = [];
  for (let i = 0; i < count; i++) {
    let randomQuestion;
    do {
      randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    } while (randomQuestions.includes(randomQuestion));
    randomQuestions.push(randomQuestion);
  }
  return randomQuestions;
}
