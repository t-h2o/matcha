import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { PossibleMatchesUserData } from '../../../shared/models/data-to-api/user';
import { UserItemComponent } from './user-item.component';

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
      firstname: 'test-firstname',
      lastname: 'test-lastname',
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
      const compiled = fixture.debugElement.query(
        By.css('[data-testid="username"]'),
      );
      expect(compiled.nativeElement.textContent).toContain('test');
    });

    it('should render firstname in the component', () => {
      const compiled = fixture.debugElement.query(
        By.css('[data-testid="firstname"]'),
      );
      expect(compiled.nativeElement.textContent).toContain('test-firstname');
    });

    it('should render lastname in the component', () => {
      const compiled = fixture.debugElement.query(
        By.css('[data-testid="lastname"]'),
      );
      expect(compiled.nativeElement.textContent).toContain('test-lastname');
    });

    it('should render age in the component', () => {
      const compiled = fixture.debugElement.query(
        By.css('[data-testid="age"]'),
      );
      expect(compiled.nativeElement.textContent).toContain('20');
    });

    it('should render gender in the component', () => {
      const compiled = fixture.debugElement.query(
        By.css('[data-testid="gender"]'),
      );
      expect(compiled.nativeElement.textContent).toContain('Male');
    });

    it('should render sexualPreference in the component', () => {
      const compiled = fixture.debugElement.query(
        By.css('[data-testid="sexualPreference"]'),
      );
      expect(compiled.nativeElement.textContent).toContain('Homosexual');
    });
  });
});
