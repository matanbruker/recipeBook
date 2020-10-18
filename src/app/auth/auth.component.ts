import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponse, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  loginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    let authObs: Observable<AuthResponse>;

    if (this.loginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['./recipes']);
      }, errorMessage => {
        this.error = errorMessage;
        console.log(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
