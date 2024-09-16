import { Survey } from './survey.interface';


export interface SurveyResponse{
  surveys:Survey[];
  total: number;
}
