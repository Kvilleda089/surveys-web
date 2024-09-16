import { Component, OnInit } from '@angular/core';
import { UserService } from '../../serivices/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';

  constructor(private userService: UserService,
              private router: Router
  ) { }

  login() {
    console.log(this.email, this.password);
    this.userService.login(this.email, this.password).subscribe(response => {
      const userDataLocalStorage ={
        id: response.user.id,
        email: response.user.email
      }
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userDataLocalStorage));
      this.router.navigate(['/home']);
    }, error => {
      console.log("Error Login", error);
    }
    )
  };

  goToRegister(){
    this.router.navigate(['/register'])
  }
  ngOnInit(): void {
  }

}
