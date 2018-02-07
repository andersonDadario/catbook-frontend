import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Catbook';
  user: User;

  constructor(private _userService: UserService) {}

  ngOnInit() {
    this.syncCurrentUser();
  }

  syncCurrentUser() {
    this._userService.currentMessage.subscribe(user => this.user = user);
  }


}
