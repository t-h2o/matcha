import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMessagesComponent } from './display-messages.component';
import { UserService } from '../../../shared/services/user.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { testUser } from '../../../shared/models/emptyUser';
import { By } from '@angular/platform-browser';

describe('DisplayMessagesComponent', () => {
  let component: DisplayMessagesComponent;
  let fixture: ComponentFixture<DisplayMessagesComponent>;
  let mockUserService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayMessagesComponent],
      providers: [UserService, provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayMessagesComponent);
    component = fixture.componentInstance;
    component.messages = [
      {
        id: 101,
        senderUsername: 'Alice',
        text: 'Hello Robin!',
      },
      {
        id: 102,
        senderUsername: 'roburi',
        text: 'Hi Alice!',
      },
    ];
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
  });
});
