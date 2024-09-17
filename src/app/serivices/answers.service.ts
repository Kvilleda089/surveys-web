import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-service.jwt';
import { Observable } from 'rxjs';
import { ValidateTokenUtil } from './utils/validate-token.util';
import { Survey } from '../interface/survey.interface';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  private apiUrl = environment.apiUrl;
  constructor(private httpclient: HttpClient,
              private autService: AuthService
  ) { }

  createResponse(dataResponse: any): Observable<any> {
    const url = `${this.apiUrl}/forms/answers`;
    const headers = ValidateTokenUtil.validateToken(this.autService);
    return this.httpclient.post<any>(url, dataResponse, {headers});
  };

  getResponseSurvey(userId: number, surveyId: number, page: number, pageSize:number): Observable<any>{
    const url = `${this.apiUrl}/forms/answers/users/${userId}/surveys/${surveyId}?page=${page}&pageSize=${pageSize}`;
    const headers = ValidateTokenUtil.validateToken(this.autService);
    return this.httpclient.get<any>(url, {headers});
  }
}
