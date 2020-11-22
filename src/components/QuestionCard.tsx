import React from "react";

import { AnswerObject } from "../App";

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
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map(ans => (
          <div key={ans}>
            <button disabled={!!userAnswer} value={ans} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: ans }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
