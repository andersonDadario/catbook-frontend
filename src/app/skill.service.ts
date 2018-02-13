import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Skill } from './models/skill';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from  'rxjs/operators';
import { environment } from 'app/../environments/environment';

@Injectable()
export class SkillService {

  private skillsUrl = `${environment.backendUrl}/api/v1/skills`;

  constructor(
    private http: HttpClient,
  ) { }

  // get skills from any user
  getSkillsForUser(user: User): Observable<any> {
    const skillForUserURL = `${this.skillsUrl}?user_id=${user.id}`;
    return this.http.get<Skill[]>(skillForUserURL)
       .pipe(
          tap(skills => this.log('SkillService: getSkillsForUser()')),
          catchError(this.handleError('getSkillsForUser',[]))
       );
  }

  // delete skill from the logged in user
  deleteSkill(skill: Skill): Observable<any> {
    const skillForUserURL = `${this.skillsUrl}/${skill.id}`;
    return this.http.delete(skillForUserURL)
       .pipe(
          tap(skills => this.log('SkillService: deleteSkill()')),
          catchError(this.handleError('deleteSkill',[]))
       );
  }

  // create skill for the logged in user
  createSkill(skill: Skill): Observable<any> {
    return this.http.post<Skill>(this.skillsUrl, skill)
       .pipe(
          tap(skills => this.log('SkillService: createSkill()')),
          catchError(this.handleError('createSkill',{}))
       );
  }

  // update skill for the logged in user
  updateSkill(skill: Skill): Observable<any> {
    const skillForUserURL = `${this.skillsUrl}/${skill.id}`;
    return this.http.patch<Skill>(skillForUserURL, skill)
       .pipe(
          tap(users => this.log('SkillService: updateSkill()')),
          catchError(this.handleError('updateSkill',{}))
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
