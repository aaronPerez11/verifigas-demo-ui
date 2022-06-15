import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'verificador';

  constructor( private router: Router) {}

  paginaPrincipal(){
    this.router.navigate(['login'])
  }
}
