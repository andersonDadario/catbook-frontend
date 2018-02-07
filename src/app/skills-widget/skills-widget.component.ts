import { Component, OnInit } from '@angular/core';
import { Skill } from '../models/skill';
import { User } from '../models/user';
import { SkillEndorsement } from '../models/endorsement';
import { UserService } from '../user.service';
import { SkillService } from '../skill.service';
import { EndorsementService } from '../endorsement.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { MatFormField, MatInputModule, MatSelectModule } from '@angular/material';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-skills-widget',
  templateUrl: './skills-widget.component.html',
  styleUrls: ['./skills-widget.component.css'],
  animations: [
      trigger('skillState', [
        state('inactive', style({})),
        state('active',   style({
          animationName: 'spin',
          animationDuration: '500ms',
          animationIterationCount: '1',
          animationTimingFunction: 'linear',
        })),
        transition('inactive => active', animate('100ms ease-in')),
        transition('active => inactive', animate('100ms ease-out'))
      ])
    ]
})
export class SkillsWidgetComponent implements OnInit {
  skillAnimationState = 'inactive';
  user: User = null;
  userToBeEndorsed: User = null;
  users: User[] = [];
  skills: Skill[] = [];
  endorsers: User[] = [];

  constructor(
    private _userService: UserService,
    private _skillService: SkillService,
    private _endorsementService: EndorsementService,
    ) { }

  ngOnInit() {
    this.loadCurrentUser();
    this.populateUsersToBeEndorsed();
  }

  isSkillEndorsedByCurrentUser(skill: Skill) {
    return skill.endorsers.map(a => a.id).includes(this.user.id); 
  }

  updateUserToBeEndorsed(userId: number) {
    // Update variable
    this.userToBeEndorsed = this.users.find(
      function (obj) { return obj.id.toString() === userId.toString(); });
    
    // Load skills
    this._skillService.getSkillsForUser(this.userToBeEndorsed)
      .subscribe(skills => this.skills = skills);
  }

  addOrDeleteEndorsement(skill: Skill) {
    if(this.isUserTryingToEndorseHimself(skill)){
      return false;
    }
    this.toggleStateQuickly(); // animation

    if (this.isSkillEndorsedByCurrentUser(skill)) {
      this.deleteEndorsement(skill);
    } else {
      this.createEndorsement(skill);
    }
  }

  isUserTryingToEndorseHimself(skill: Skill) {
    if (skill.user_id == this.user.id) {
      console.log('I got you');
      return true;
    }
    return false;
  }

  createEndorsement(skill: Skill) {
    skill.total_of_endorsers++;
    skill.endorsers.push(this.user);
    const endorsement = new SkillEndorsement(null, this.user, skill);
    this._endorsementService.createEndorsement(endorsement).subscribe();
  }

  deleteEndorsement(skill: Skill) {
    skill.total_of_endorsers--;
    skill.endorsers = skill.endorsers.filter(user => user.id !== this.user.id);
    const endorsement = new SkillEndorsement(null, this.user, skill);

    this._endorsementService.getEndorsement(endorsement.skill, endorsement.user)
        .flatMap(endorsements => {
          const endorsement = endorsements[0];
          return this._endorsementService.deleteEndorsement(endorsement);
        })
        .subscribe();
  }

  private loadCurrentUser() {
    this.user = this._userService.getCurrentUser();
  }

  private populateUsersToBeEndorsed() {
    this._userService.getUsers().subscribe((users) => {
      this.users = users;
      this.updateUserToBeEndorsed(users[0].id);
    });
  }

  // Specific for animation
  async toggleStateQuickly() {
      this.skillAnimationState = 'active';
      await this.sleep(600);
      this.skillAnimationState = 'inactive';
  }

  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
