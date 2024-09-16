import { Question } from "./question.interface";



export interface QuestionOption {

  id?: number;
  question: Question;
  optionText: String;
}
