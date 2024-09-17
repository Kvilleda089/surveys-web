import { Component, OnInit } from '@angular/core';
import { UserService } from '../../serivices/user.service';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';


  constructor(private userService: UserService,
              private router: Router,

  ) { }

  login() {
    this.userService.login(this.email, this.password).subscribe(response => {
      const userDataLocalStorage ={
        id: response.user.id,
        email: response.user.email
      }
      alertify.set('notifier', 'position', 'top-center');
      alertify.success('Login successful');
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userDataLocalStorage));
      this.router.navigate(['/home']);
    }, error => {
      alertify.set('notifier', 'position', 'top-center');
      alertify.error("Error logging in, please verify that your email or password is correct");
    }
    )
  };

  goToRegister(){
    this.router.navigate(['/register'])
  }
  ngOnInit(): void {
  }

}
