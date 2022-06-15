import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string = 'admin';
  password: string = 'QwertY';
  pathImgLogin: string = "../../../assets/login.svg"
  usuarioInput: string = '';
  passwordInput: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  iniciarSesion(){
    if(this.usuario === this.usuarioInput && this.password === this.passwordInput){
      this.router.navigate(['marca'])
    }
  }

}
