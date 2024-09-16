import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/serivices/user.service';

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
      localStorage.setItem('toke', response.token);
      localStorage.setItem('user', response.user.email);
      this.router.navigate(['/create-survey']);
    }, errorReponse =>{
      console.log('Error create', errorReponse);
    })
  };
  ngOnInit(): void {
  }

}
