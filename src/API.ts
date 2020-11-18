import { shuffleArray } from "./utils";
export type Question = {
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "HARD"
}

export const fetchQuizQuestions = async (difficulty: Difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple&category=11`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer
    ])
  }));
};
