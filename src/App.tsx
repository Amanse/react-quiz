import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";

//components
import { QuestionCard } from "./components/QuestionCard";

//types
import { QuestionState, Difficulty, Category } from "./API";
type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 15;
var userCategory: Category = Category.ANIME;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [category, setCategory] = useState<string>("Anime");

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    switch (category) {
      case "Anime":
        userCategory = Category.ANIME;
        break;
      case "Comp":
        userCategory = Category.COMP;
        break;
      case "Movies":
        userCategory = Category.MOVIES;
        break;
      case "tv":
        userCategory = Category.TV;
        break;
      case "myth":
        userCategory = Category.MYTH;
        break;
      default:
        userCategory = Category.ANIME;
    }

    const newQuestions = await fetchQuizQuestions(
      Difficulty.HARD,
      TOTAL_QUESTIONS,
      userCategory
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //User answers
      const answer = e.currentTarget.value;
      //Check answer if correct
      const correct = questions[number].correct_answer === answer;
      //Add score if correct
      if (correct) setScore(prev => prev + 1);
      //Save answer in array for userAnswers
      const answerObject: AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    //move on to next question if not last
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const changeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <div className="App">
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <>
            <select value={category} onChange={changeCategory}>
              <option value="Anime">Anime</option>
              <option value="Comp">Computer</option>
              <option value="Movies">Movies</option>
              <option value="tv">TV</option>
            </select>
            <button className="start" onClick={startTrivia}>
              Start
            </button>
          </>
        ) : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading ? <p>Loading Questions.....</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next
          </button>
        ) : null}
      </div>
    </>
  );
}

export default App;
