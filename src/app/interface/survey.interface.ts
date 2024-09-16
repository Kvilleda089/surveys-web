import { Question } from "./question.interface";

export interface Survey{
  id?: number;
  createdUserId?: number;
  title: string;
  description: string;
  createAt?: Date;
  updateAt?: Date;
  questions: Question[];
}
