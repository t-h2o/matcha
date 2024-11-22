import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemComponent } from './user-item.component';
import { PossibleMatchesUserData } from '../../../shared/models/data-to-api/user';
import { By } from '@angular/platform-browser';

describe('TestComponent', () => {
  let component: UserItemComponent;
  let fixture: ComponentFixture<UserItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserItemComponent);
    component = fixture.componentInstance;
    component.user = {
      username: 'test',
      firstname: 'test',
      lastname: 'test',
      age: '20',
      gender: 'm',
      sexualPreference: 'o',
      fameRating: 3,
      urlProfile: 'test',
    } as PossibleMatchesUserData;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('input user', () => {
    it('should be defined', () => {
      expect(component.user).toBeDefined();
    });

    it('should have a username', () => {
      expect(component.user.username).toBe('test');
    });
  });

  describe('renders user detail in the template', () => {
    it('should render username in the component', () => {
      const compiled = fixture.debugElement.query(By.css('[data-testid="username]'));
      expect(compiled.nativeElement.textContent.toContain('test'));
    });
  });
});
