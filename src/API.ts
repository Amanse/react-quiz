export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "HARD"
}

export const fetchQuizQuestions = async (difficulty: Difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  console.log(data);
};
