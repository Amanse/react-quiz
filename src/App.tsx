import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
import "./App.css";

//components
import { QuestionCard } from "./components/QuestionCard";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles
} from "@material-ui/core";

//types
import { QuestionState, Difficulty, Category } from "./API";
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

var userCategory: Category = Category.ANIME;
var userDifficulty: Difficulty = Difficulty.EASY;

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [category, setCategory] = useState<string>("Anime");
  const [difficulty, setDifficulty] = useState<string>("Easy");
  const [totalQuestions, setTotalQuestions] = useState<number>(10);

  const classes = useStyles();

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    //Category set
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

    //Difficulty set
    switch (difficulty) {
      case "Easy":
        userDifficulty = Difficulty.EASY;
        break;
      case "Medium":
        userDifficulty = Difficulty.MEDIUM;
        break;
      case "Hard":
        userDifficulty = Difficulty.HARD;
        break;
      default:
        userDifficulty = Difficulty.EASY;
        break;
    }

    const newQuestions = await fetchQuizQuestions(
      userDifficulty,
      totalQuestions,
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
      if (correct) {
        e.currentTarget.style.background = "green";
      } else if (answer !== answerObject.correctAnswer) {
        e.currentTarget.style.background = "red";
      }
      setUserAnswers(prev => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    //move on to next question if not last
    const nextQuestion = number + 1;
    if (nextQuestion === totalQuestions) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <div className="App">
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === totalQuestions ? (
          <>
            <div className="selectForGame">
              <FormControl className={classes.formControl}>
                <InputLabel id="difficulty">Difficulty</InputLabel>
                <Select
                  labelId="difficulty"
                  id="select1"
                  value={difficulty}
                  onChange={(e: any) => {
                    setDifficulty(e.target.value);
                  }}
                >
                  <MenuItem value="Easy">Easy</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Hard">Hard</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  id="select2"
                  value={category}
                  onChange={(e: any) => {
                    setCategory(e.target.value);
                  }}
                >
                  <MenuItem value="Anime">Anime</MenuItem>
                  <MenuItem value="Comp">Comp</MenuItem>
                  <MenuItem value="Movies">Movies</MenuItem>
                  <MenuItem value="tv">TV</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="totalQuestions">Total Questions</InputLabel>
                <Select
                  labelId="totalQuestions"
                  id="select3"
                  value={totalQuestions}
                  onChange={(e: any) => {
                    setTotalQuestions(e.target.value);
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </FormControl>
            </div>

            <Button
              variant="contained"
              color="primary"
              className="start"
              onClick={startTrivia}
            >
              Start
            </Button>
          </>
        ) : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {!gameOver ? <p>Category: {category} </p> : null}
        {loading ? <p>Loading Questions.....</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={totalQuestions}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== totalQuestions - 1 ? (
          <Button color="secondary" className="next" onClick={nextQuestion}>
            Next
          </Button>
        ) : null}
      </div>
    </>
  );
}

export default App;
