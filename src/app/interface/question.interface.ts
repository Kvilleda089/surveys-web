import { QuestionOption } from './question-option.interface';
import { Survey } from './survey.interface';


export interface  Question{
  id?: number;
  survey: Survey;
  questionText: string;
  questionType: string;
  isRequired: boolean;
  options?: QuestionOption[];
}
