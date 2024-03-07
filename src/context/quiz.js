import { createContext, useReducer } from "react";
import question from "../data/question_complete.js";

const STAGES = ["Start", "Playing", "End"];

const initialState = {
    gameStage: STAGES[0],
    question,
    currentQuestion: 0,
    score: 0,
    answerSelected: false,
};

const quizReducer  = (state, action) => {

    switch (action.type) {
        case "CHANGE_STAGE":
          return {
            ...state,
            gameStage: STAGES[1],
          };
    
        case "START_GAME":
          let quizQuestions = null;
    
          state.questions.forEach((question) => {
            if (question.category === action.payload) {
              quizQuestions = question.questions;
            }
          });
    
          return {
            ...state,
            questions: quizQuestions,
            gameStage: STAGES[2],
          };
    
        case "REORDER_QUESTIONS":
          const reorderedQuestions = state.questions.sort(() => {
            return Math.random() - 0.5;
          });
    
          return {
            ...state,
            questions: reorderedQuestions,
          };
    
        case "CHANGE_QUESTION": {
          const nextQuestion = state.currentQuestion + 1;
          let endGame = false;
    
          if (!state.questions[nextQuestion]) {
            endGame = true;
          }
    
          return {
            ...state,
            currentQuestion: nextQuestion,
            gameStage: endGame ? STAGES[3] : state.gameStage,
            answerSelected: false,
            help: false,
          };
        }

            default: 
            return state;
    }

}


export const QuizContext = createContext();

export const QuizProvider = ({children}) => {

    const value = useReducer(quizReducer, initialState);
    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}