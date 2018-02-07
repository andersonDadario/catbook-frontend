import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(private _userService: UserService) { }

  selectUser(user: User) {
    this._userService.setCurrentUser(user);
  }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this._userService.getUsers().subscribe(
      users => this.users = users);
  }

}
