import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SkillsWidgetComponent } from './skills-widget/skills-widget.component';
import { UsersListComponent } from './users-list/users-list.component';
import { SkillsEditionComponent } from './skills-edition/skills-edition.component';
import { SkillService } from './skill.service';
import { UserService } from './user.service';
import { EndorsementService } from './endorsement.service';

import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    SkillsWidgetComponent,
    UsersListComponent,
    SkillsEditionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [SkillService, UserService, EndorsementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
