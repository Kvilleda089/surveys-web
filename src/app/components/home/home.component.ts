import { Component, OnInit } from '@angular/core';
import { Survey } from '../../interface/survey.interface';
import { SurveysService } from '../../serivices/surveys.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  surveys: Survey[] = [];
  total: number = 0;
  userId: number | null = null;
  page: number = 1;
  pageSize: number = 10;

  constructor(private surveyService: SurveysService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSurveys();
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
          console.log("Not surveys createds", data);
          this.surveys = data.surveys || [];
          this.total = data.total || 0;
        }
          this.surveys = data.surveys;
          this.total = data.total;
        }, error =>{
          console.log("Error: ", error);
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
    this.router.navigate(['/create-survey', id])
  }
  deleteSurvey(id: number): void{
    if(confirm('Are you sure you want to delete this survey')){
      this.surveyService.deleteSurveys(id).subscribe(response =>{
        console.log('Delete Survey: ');
        this.loadSurveys();
      })
    }
  }

  goToCreateSurvey(){
      this.router.navigate(['/create-survey'])
    }


}
