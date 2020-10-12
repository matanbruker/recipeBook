import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  loginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {
  }

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    if (this.loginMode) {
      // ...
    } else {
      this.authService.signup(email, password).subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
        }, errorMessage => {
          this.error = errorMessage;
          console.log(errorMessage);
          this.isLoading = false;
        }
      );
    }

    form.reset();
  }
}
