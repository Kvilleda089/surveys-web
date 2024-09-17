import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Survey } from "src/app/interface/survey.interface";


@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private surveysSubject = new BehaviorSubject<Survey | null>(null);
  sruvey$ = this.surveysSubject.asObservable();

  setSurvey(survey: Survey){
    this.surveysSubject.next(survey);
  }

  getSurvey(){
    return this.sruvey$;
  }
}
