import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsEditionComponent } from './skills-edition.component';

describe('SkillsEditionComponent', () => {
  let component: SkillsEditionComponent;
  let fixture: ComponentFixture<SkillsEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
