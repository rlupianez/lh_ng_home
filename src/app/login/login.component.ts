import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error = '';

  constructor( fb: FormBuilder, public authService: AuthService, public router: Router ) {

      this.loginForm = fb.group({
        username: '',
        password: ''
      });

  }

  ngOnInit() {
  }

  async login(form) {
    const userData = form.value;

    this.authService.login(userData).subscribe( (res) => {

      if (this.authService.currentUserValue.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }

    },
    (error) => {

      if (error.status === 401) {
        const self = this;
        this.error = 'Usuario o contraseña incorrecta. Por favor intente de nuevo';

        window.setTimeout( () => {
            self.error = '';
        }, 3500);

      }
    });
  }

}
