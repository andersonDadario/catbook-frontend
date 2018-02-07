import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from  'rxjs/operators';
import { User } from './models/user';
import { environment } from 'app/../environments/environment';

@Injectable()
export class UserService {
  user: User = null;
  private messageSource = new BehaviorSubject<any>(null);
  currentMessage = this.messageSource.asObservable();
  private usersUrl = `${environment.backendUrl}/api/v1/users`;

  constructor(
    private http: HttpClient,
  ) { }

  getCurrentUser() {
    return this.user;
  }

  setCurrentUser(user: User) {
    this.user = user;
    this.messageSource.next(user)
  }

  getUsers() {
    return this.http.get<User[]>(this.usersUrl)
       .pipe(
          tap(users => this.log('UserService: getUsers()')),
          catchError(this.handleError('getUsers',[]))
       );
  }

  private log(message: string) {
    console.log(message);
  }

 /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        // TODO send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result
        return of(result as T);
    }
  }

}
