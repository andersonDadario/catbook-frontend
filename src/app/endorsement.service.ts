import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Skill } from './models/skill';
import { SkillEndorsement } from './models/endorsement';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from  'rxjs/operators';
import { environment } from 'app/../environments/environment';

@Injectable()
export class EndorsementService {

  private endorsementsUrl = `${environment.backendUrl}/api/v1/endorsements`;

  constructor(
    private http: HttpClient,
  ) { }


  // get endorsement
  getEndorsement(skill: Skill, user: User): Observable<any> {
    const endorsementSpecificURL = `${this.endorsementsUrl}/?user_id=${user.id}&skill_id=${skill.id}`;
    return this.http.get(endorsementSpecificURL)
       .pipe(
          tap(res => this.log('EndorsementService: getEndorsement()')),
          catchError(this.handleError('getEndorsement',[]))
       );
  }

  // delete endorsement
  deleteEndorsement(endorsement: SkillEndorsement): Observable<any> {
    const endorsementSpecificURL = `${this.endorsementsUrl}/${endorsement.id}`;
    return this.http.delete(endorsementSpecificURL)
        .pipe(
          tap(res => this.log('EndorsementService: deleteEndorsement()')),
          catchError(this.handleError('deleteEndorsement',[]))
        );
  }

  // add endorsement
  createEndorsement(endorsement: SkillEndorsement): Observable<any> {
    const payload = {
      user_id: endorsement.user.id,
      skill_id: endorsement.skill.id
    };
    return this.http.post(this.endorsementsUrl, payload)
       .pipe(
          tap(res => this.log('EndorsementService: createEndorsement()')),
          catchError(this.handleError('createEndorsement',{}))
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
