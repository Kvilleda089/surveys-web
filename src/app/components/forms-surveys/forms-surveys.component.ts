import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/interface/survey.interface';
import { SurveysService } from '../../serivices/surveys.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forms-surveys',
  templateUrl: './forms-surveys.component.html',
  styleUrls: ['./forms-surveys.component.css']
})
export class FormsSurveysComponent implements OnInit {
  userId: number | null = null;
  survey: Survey = {
    title: '',
    description: '',
    questions: []
  };
  surveyId:number | null;
  isEditing: boolean;


  constructor(private surveyService:SurveysService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params =>{
      this.surveyId = +params.get('id');
      this.isEditing = this.surveyId !== null;
      if(this.surveyId){
        this.loadSurve(this.surveyId);
      }
    })
  };

  loadSurve(id: number){
    this.surveyService.getSurveyById(this.surveyId).subscribe(survey =>{
      this.survey = survey;
    })
  }

  fromEntries(entries: [string, any][]): { [key: string]: any } {
    return entries.reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
  }

  removeCircularReferences(obj: any, visited = new WeakSet()): any {
    if (obj && typeof obj === 'object') {
      if (visited.has(obj)) {
        return;
      }
      visited.add(obj);

      if (Array.isArray(obj)) {
        return obj.map(item => this.removeCircularReferences(item, visited));
      } else {
        return this.fromEntries(
          Object.entries(obj)
            .filter(([key]) => key !== 'survey')
            .map(([key, value]) => [key, this.removeCircularReferences(value, visited)])
        );
      }
    }
    return obj;
  };


  onSubmit() {
    const userData = localStorage.getItem('user');
    const user = JSON.parse(userData);
    this.userId = user.id;

    const transformedFields = this.survey.questions.map((question) => ({
      ...question,
      options: this.extractOptionTexts(question.options)
    }));



    const surveyToSend = this.removeCircularReferences({
      ...this.survey,
      createdUserId: this.userId,
      questions: transformedFields
    });


    const updateTransformQuestioNew =  this.survey.questions.map((question) => {
      if (!question.id) {
        return {
          ...question,
          options: question.options.map((opt: any) => typeof opt === 'string' ? opt : opt.optionText)
        };
      } else {
        return {
          ...question,
          options: question.options
        };
      }
    });

    const surveyToUpdateSend = this.prepareSurveyForUpdate({
      ...this.survey,
      createdUserId: this.userId,
      questions: updateTransformQuestioNew

    });

    if(this.surveyId){
      this.updateSurvey(this.surveyId, surveyToUpdateSend);
    }else {
      this.surveyService.createSurvey(surveyToSend).subscribe(response => {
        console.log('Encuesta creada', response);
        this.router.navigate(['/home']);
      });
    }
  };

  addQuestion() {
    this.survey.questions.push({
      questionText: '',
      questionType: 'text',
      isRequired: false,
      options: [],
      survey: this.survey
    });
  }

  removeQuestion(index: number) {
    this.survey.questions.splice(index, 1);
  }

  addOption(questionIndex: number) {
    if (this.survey.questions[questionIndex].options) {
      this.survey.questions[questionIndex].options.push({
        question: this.survey.questions[questionIndex],
        optionText: ''
      });
    } else {
      this.survey.questions[questionIndex].options = [{
        question: this.survey.questions[questionIndex],
        optionText: ''
      }];
    }
  }

  extractOptionTexts(options: { optionText: String }[]): string[] {
    return options.map(option => option.optionText.toString());
  }

  removeOption(questionIndex: number, optionIndex: number) {
    this.survey.questions[questionIndex].options?.splice(optionIndex, 1);
  }

  onQuestionTypeChange(index: number) {
    const question = this.survey.questions[index];
    if (question.questionType !== 'multiple_choice') {
      question.options = [];
    }
  }

  prepareSurveyForUpdate(survey: Survey): any {
    return {
      ...survey,
      questions: survey.questions.map(question => {
        const preparedQuestion = {
          ...question,
          options: question.options.map(option => {
            if (option.id) {
              return { id: option.id, optionText: option.optionText };
            }
            return { optionText: option.optionText };
          })
        };
        if (!question.id) {
          delete preparedQuestion.id;
          delete preparedQuestion.survey;
        }

        return preparedQuestion;
      })
    };
  }

  updateSurvey(surveyId: number, surveyBody: Survey){

    this.surveyService.updateSurveys(surveyId, surveyBody).subscribe(responseUpdate=>{
      console.log("Survey updated ", responseUpdate);
      this.router.navigate(['/home'])
    })
  }

}
