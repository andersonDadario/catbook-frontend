import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Skill } from '../models/skill';
import { UserService } from '../user.service';
import { SkillService } from '../skill.service';
import { MatFormField } from '@angular/material';

@Component({
  selector: 'app-skills-edition',
  templateUrl: './skills-edition.component.html',
  styleUrls: ['./skills-edition.component.css']
})
export class SkillsEditionComponent implements OnInit {
  public user: User = null;
  public skills: Skill[] = [];

  constructor(
    private _userService: UserService,
    private _skillService: SkillService,
    ) { }

  ngOnInit() {
    this.loadSkillsFromCurrentUser();
  }

  loadSkillsFromCurrentUser() {
    // Load current user
    this.user = this._userService.getCurrentUser();
    if (!this.user) {
      return;
    }

    // Load skills
    this._skillService.getSkillsForUser(this.user)
      .subscribe(skills => this.skills = skills);
  }

  public addNewSkillField() {
    this.skills.push(Skill.generateEmptySkill());
  }

  public createOrUpdateSkill(skill: Skill) {
    if (skill.id) {
      this.updateSkill(skill);
    } else {
      this.createSkill(skill);
    }
    // notify
  }

  private createSkill(skill: Skill) {
    skill.user_id = this.user.id;
    this._skillService.createSkill(skill).subscribe();
  }

  private updateSkill(skill: Skill) {
    skill.user_id = this.user.id;
    this._skillService.updateSkill(skill).subscribe();
  }

  public deleteSkillField(skill: Skill){
    this.skills = this.skills.filter(s => s !== skill);
    if (skill.id) {
      this._skillService.deleteSkill(skill).subscribe();
    }
  }

}
