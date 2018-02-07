import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillsWidgetComponent } from './skills-widget/skills-widget.component';
import { UsersListComponent } from './users-list/users-list.component';
import { SkillsEditionComponent } from './skills-edition/skills-edition.component';


const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', component: UsersListComponent },
    { path: 'edit', component: SkillsEditionComponent },
    { path: 'skills', component: SkillsWidgetComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
