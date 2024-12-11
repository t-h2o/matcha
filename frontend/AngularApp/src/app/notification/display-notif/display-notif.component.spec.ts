import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNotifComponent } from './display-notif.component';

describe('DisplayNotifComponent', () => {
  let component: DisplayNotifComponent;
  let fixture: ComponentFixture<DisplayNotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayNotifComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
