import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleSideBarComponent } from './toggle-side-bar.component';

describe('ToggleSideBarComponent', () => {
  let component: ToggleSideBarComponent;
  let fixture: ComponentFixture<ToggleSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
