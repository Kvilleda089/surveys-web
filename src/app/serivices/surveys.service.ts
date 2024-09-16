import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Survey } from '../interface/survey.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service.jwt';
import { SurveyResponse } from '../interface/survey-response.entity';

@Injectable({
  providedIn: 'root'
})
export class SurveysService {
 private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient,
              private authService: AuthService
  ) { }

  createSurvey(survey: Survey): Observable<any> {
    const url = `${this.apiUrl}/forms/surveys`;
    const headers = this.validateToken();
    console.log("Desde el service");
    console.log(survey);
    return this.httpClient.post<any>(url, survey, {headers});
  };

  getSurveysByUserId(userId: number, page: number, pageSize:number): Observable<SurveyResponse> {
    const headers = this.validateToken();
    const url = `${this.apiUrl}/forms/surveys?createdUserId=${userId}&page=${page}&pageSize=${pageSize}`;
    return this.httpClient.get<SurveyResponse>(url, {headers});
  };

  getSurveyById(id: number): Observable<Survey> {
    const headers = this.validateToken();
    const url = `${this.apiUrl}/forms/surveys/${id}`;
    return this.httpClient.get<Survey>(url, {headers});
  };


  deleteSurveys(id: number): Observable<SurveyResponse> {
    const headers = this.validateToken();
    const url = `${this.apiUrl}/forms/surveys/${id}`;
    return this.httpClient.delete<SurveyResponse>(url, {headers});
  };

  updateSurveys(id: number, surveyUpdate:Survey): Observable<any>{
    const url = `${this.apiUrl}/forms/surveys/${id}`;
    const headers = this.validateToken();
    return this.httpClient.put<any>(url, surveyUpdate, {headers});

  };


  validateToken(): HttpHeaders{
    const token = this.authService.getToken();
    return new HttpHeaders({
       'Authorization': `Bearer ${token}`
    })
  };
}
