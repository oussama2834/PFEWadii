import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmPagesComponent } from './pm-pages.component';

describe('PmPagesComponent', () => {
  let component: PmPagesComponent;
  let fixture: ComponentFixture<PmPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
