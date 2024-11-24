import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMessagesComponent } from './display-messages.component';

describe('DisplayMessagesComponent', () => {
  let component: DisplayMessagesComponent;
  let fixture: ComponentFixture<DisplayMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayMessagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
