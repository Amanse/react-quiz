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
  HARD = "hard"
}

//category codes
//movies 11
//anime 31
//mythology 20
//tv 14
// computers 18
export const fetchQuizQuestions = async (
  difficulty: Difficulty,
  total_questions: number
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${total_questions}&difficulty=${difficulty}&type=multiple&category=18`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer
    ])
  }));
};
