import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/serivices/user.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email = '';
  password = '';
  constructor(private userService: UserService,
              private router: Router
  ) { }

  saveUser(){
    this.userService.saveUser(this.email, this.password).subscribe(response =>{
      this.alertNotifiySucces('Welcome! Your account has been created successfully.');
      localStorage.setItem('toke', response.token);
      localStorage.setItem('user', response.user.email);
      this.router.navigate(['/home']);
    }, errorReponse =>{
      this.alertNotifyError('Sorry, an error occurred. Please try again.')
    })
  };
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
