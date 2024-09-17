import { Component, Input, OnInit } from '@angular/core';
import { Survey } from '../../interface/survey.interface';
import { Router } from '@angular/router';
import { SurveyService } from '../service/survey-service';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.css']
})
export class ViewSurveyComponent implements OnInit {

  @Input() surveyView: Survey | null = null;
  constructor(private router: Router,
              private surveServiceLoca: SurveyService
  ) { }

  ngOnInit(){

    this.surveServiceLoca.getSurvey().subscribe(surveyTem =>{
      this.surveyView = surveyTem;
    })
  }

  goBack(){
    this.surveServiceLoca.setSurvey(this.surveyView);
    window.history.back();
  }

}
