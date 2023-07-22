import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsPmComponent } from './projects-pm.component';

describe('ProjectsPmComponent', () => {
  let component: ProjectsPmComponent;
  let fixture: ComponentFixture<ProjectsPmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsPmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
