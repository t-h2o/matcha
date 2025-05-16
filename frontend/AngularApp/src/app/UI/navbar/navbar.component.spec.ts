import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterModule, RouterTestingModule],
      providers: [
        UserService,
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if the current route is /login', () => {
    jest.spyOn(router, 'url', 'get').mockReturnValue('/login');
    expect(component.isLoginRoute()).toBe(true);
  });
  it('should return true if the current route is /register', () => {
    jest.spyOn(router, 'url', 'get').mockReturnValue('/register');
    expect(component.isRegisterRoute()).toBe(true);
  });
  it('should return true if the current route is /profile', () => {
    jest.spyOn(router, 'url', 'get').mockReturnValue('/profile');
    expect(component.isProfileRoute()).toBe(true);
  });
});
