import { Component, OnInit } from '@angular/core';
import { Survey } from '../../interface/survey.interface';
import { AnswersService } from '../../serivices/answers.service';
import { SurveysService } from '../../serivices/surveys.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-fill-survey',
  templateUrl: './fill-survey.component.html',
  styleUrls: ['./fill-survey.component.css']
})
export class FillSurveyComponent implements OnInit {
  survey: Survey = {
    title: '',
    description: '',
    questions: []
  };
  responses: any[] = [];
  surveyId: number | null = null;

  constructor(private surveyService: SurveysService,
              private route: ActivatedRoute,
              private router: Router,
              private answerService: AnswersService
  ) {
    this.route.paramMap.subscribe(params =>{
      this.surveyId = +params.get('id');
      if(this.surveyId){
        this.loadSurvey(this.surveyId);
      }
    })
  }

  loadSurvey(id: number) {
    this.surveyService.getSurveyById(id).subscribe((survey: Survey) => {
      this.survey = survey;
      this.responses = new Array(this.survey.questions.length).fill(null);
    });
  }

  onSubmit(){
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    const userId = user.id;


    const responseBody = this.survey.questions.map((question, index) => {
      const userResponse = this.responses[index];


      return {
        question: question.id,
        questionOption: question.questionType === 'multiple_choice' ? this.getSelectedOptionId(question, userResponse) : null,
        textAnswer: question.questionType !== 'multiple_choice' ? userResponse : null
      };
    });


    const surveyResponse = {
      surveyId: this.survey.id,
      userId: userId,
      responseBody: responseBody
    };

    this.answerService.createResponse(surveyResponse).subscribe(response =>{
      this.alertNotifiySucces('Answer saved. Thank you for taking the time to respond.')
      console.log("Answer saved", response);
    }, error =>{
      this.alertNotifyError('Sorry, something went wrong. Please try again.');
    });
  }

  getSelectedOptionId(question: any, userResponse: string): number | null {
    const selectedOption = question.options.find(option => option.optionText === userResponse);
    return selectedOption ? selectedOption.id : null;
  }
  ngOnInit(): void {
  }

  alertNotifiySucces(message: string) {
    alertify.set('notifier', 'position', 'top-center');
    alertify.success(message)
  };

  alertNotifyError(message: string){
    alertify.set('notifier', 'position', 'top-center');
    alertify.error(message)
  }

}
