import React from "react";

import { AnswerObject } from "../App";

import {
  Card,
  CardContent,
  Button,
  Typography,
  ButtonGroup
} from "@material-ui/core";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

export const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions
}) => {
  return (
    <div>
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <Card className="questionCard">
        <Typography
          color="textPrimary"
          component="h2"
          variant="h5"
          dangerouslySetInnerHTML={{ __html: question }}
        />
        <div>
          {answers.map(ans => (
            <CardContent key={ans}>
              <ButtonGroup
                variant="contained"
                orientation="vertical"
                color="secondary"
              >
                <Button disabled={!!userAnswer} value={ans} onClick={callback}>
                  <span dangerouslySetInnerHTML={{ __html: ans }} />
                </Button>
              </ButtonGroup>
            </CardContent>
          ))}
        </div>
      </Card>
    </div>
  );
};
