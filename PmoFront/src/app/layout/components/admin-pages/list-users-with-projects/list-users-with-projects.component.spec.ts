import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersWithProjectsComponent } from './list-users-with-projects.component';

describe('ListUsersWithProjectsComponent', () => {
  let component: ListUsersWithProjectsComponent;
  let fixture: ComponentFixture<ListUsersWithProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUsersWithProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUsersWithProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
