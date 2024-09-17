import { Component, OnInit } from '@angular/core';
import { Survey } from '../../interface/survey.interface';
import { SurveysService } from '../../serivices/surveys.service';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { AnswersService } from '../../serivices/answers.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  surveys: Survey[] = [];
  surveyResponses: any = { items: [], total: 0 };
  total: number = 0;
  userId: number | null = null;
  page: number = 1;
  pageSize: number = 10;
  pageResponse: number = 1;
  pageSizeResponse: number =10;
  surveId: number | null;
  responseTotal: number = 0
  constructor(private surveyService: SurveysService,
              private router: Router,
              private answersService: AnswersService
  ) { }

  ngOnInit(): void {
    this.loadSurveys();
    this.loadResponseSurvey();
  }

  onFiltersChanged(): void {
    this.page = 1;
    this.loadSurveys();
  }

  loadSurveys(): void {
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    this.userId = user.id;

    if (this.userId !== null) {
      this.surveyService.getSurveysByUserId(this.userId, this.page, this.pageSize).subscribe(data => {
        if(data){
          this.surveys = data.surveys || [];
          this.total = data.total || 0;
        }
          this.surveys = data.surveys;
          this.total = data.total;
          this.surveId = this.surveys.length > 0 ? this.surveys[0].id : undefined;
        }, error =>{
          this.surveys = [];
          this.total = 0;
        });
    }
  }

  changePage(newPage: number): void {
    if (newPage > 0 && newPage * this.pageSize <= this.total) {
      this.page = newPage;
      this.loadSurveys();
    }
  }
  editSurvey(id: number){
    this.router.navigate(['/update-survey', id])
  }
  deleteSurvey(id: number): void{
    if(confirm('Are you sure you want to delete this survey')){
      this.surveyService.deleteSurveys(id).subscribe(response =>{
        this.alertNotifiySucces('You have successfully deleted the survey.')
        this.loadSurveys();
      }, error =>{
        this.alertNotifyError('Sorry, there was an error, please try again later.');
      })
    }
  }

  goToCreateSurvey(){
      this.router.navigate(['/create-survey'])
    }

    alertNotifiySucces(message: string) {
      alertify.set('notifier', 'position', 'top-center');
      alertify.success(message)
    };

    alertNotifyError(message: string){
      alertify.set('notifier', 'position', 'top-center');
      alertify.error(message)
    }


    loadResponseSurvey() {
      console.log(this.surveId);
      this.answersService.getResponseSurvey(this.userId, this.surveId, this.pageResponse, this.pageSizeResponse).subscribe(response=>{
        this.surveyResponses = {
          items: response.answers,
          total: response.total
        };
        this.responseTotal = response.total;
      })
    }

    changeResponsePage(page: number): void {
      this.pageResponse = page;
      this.loadResponseSurvey();
    }

}
