import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { UserService } from '../../../shared/services/user.service';
import { DisplayMessagesComponent } from './display-messages.component';

describe('DisplayMessagesComponent', () => {
  let component: DisplayMessagesComponent;
  let fixture: ComponentFixture<DisplayMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayMessagesComponent],
      providers: [UserService, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayMessagesComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('messages', [
      { timestamp: '1234', senderUsername: 'Alice', message: 'Hello Robin!' },
      {
        timestamp: '1235',
        senderUsername: 'roburi',
        message: 'Hi Alice!',
      },
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('messages testing', () => {
    it('should find 2 messages', () => {
      const message = fixture.debugElement.queryAll(
        By.css('[data-testid="message"]'),
      );
      expect(message.length).toBe(2);
    });

    it('should display the first message', () => {
      const message = fixture.debugElement.queryAll(
        By.css('[data-testid="message"]'),
      );
      expect(message[0].nativeElement.textContent).toContain('Hello Robin!');
    });

    it('should apply correct CSS classes based on username', () => {
      const messages = fixture.debugElement.queryAll(
        By.css('[data-testid="message"]'),
      );
      expect(
        messages[0].nativeElement.classList.contains('otherText'),
      ).toBeTruthy();
      expect(
        messages[0].nativeElement.classList.contains('myText'),
      ).toBeFalsy();
    });
  });
});
