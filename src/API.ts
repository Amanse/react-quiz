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

export enum Category {
  MOVIES = 11,
  ANIME = 31,
  MYTH = 20,
  TV = 14,
  COMP = 18
}

//category codes
//movies 11
//anime 31
//mythology 20
//tv 14
// computers 18
export const fetchQuizQuestions = async (
  difficulty: Difficulty,
  total_questions: number,
  category: Category
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${total_questions}&difficulty=${difficulty}&type=multiple&category=${category}`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer
    ])
  }));
};
