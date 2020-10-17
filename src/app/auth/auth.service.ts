import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';
import {UserModel} from './user.model';

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new Subject<UserModel>();
  constructor(private http: HttpClient) {
  }

  signup(userEmail: string, userPassword: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZhM9RnVlylRoQjvfyAexlmTZIIw-1f44',
      {
        email: userEmail,
        password: userPassword,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
        this.createUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  login(userEmail: string, userPassword: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZhM9RnVlylRoQjvfyAexlmTZIIw-1f44',
      {email: userEmail,
        password: userPassword,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
        this.createUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  private createUser(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new UserModel(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Wrong password';
        break;
    }
    return throwError(errorMessage);
  }
}
