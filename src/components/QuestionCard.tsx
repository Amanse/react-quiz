import React from "react";

import { AnswerObject } from "../App";

import {
  Card,
  CardContent,
  CardHeader,
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
      <Card>
        <Typography
          color="textPrimary"
          component="h2"
          variant="h5"
          dangerouslySetInnerHTML={{ __html: question }}
        />
        <div>
          {answers.map(ans => (
            <CardContent key={ans}>
              <ButtonGroup orientation="vertical" color="secondary">
                <Button
                  variant="outlined"
                  disabled={!!userAnswer}
                  value={ans}
                  onClick={callback}
                >
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
