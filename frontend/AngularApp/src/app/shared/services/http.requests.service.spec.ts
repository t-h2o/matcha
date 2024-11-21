import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserRequestsService } from './http.requests.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';

describe('UserRequestsService', () => {
  let userRequestsService: UserRequestsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserRequestsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    userRequestsService = TestBed.inject(UserRequestsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(userRequestsService).toBeTruthy();
  });

  describe('login', () => {
    it('should call httpClient.post with the correct URL and data and receive a token', () => {
      let token: { access_token: string } | undefined;
      userRequestsService
        .login({ username: 'test', password: 'test' })
        .subscribe((response) => {
          token = response;
        });
      const req = httpTestingController.expectOne(
        'http://localhost:5001/api/login',
      );
      expect(req.request.method).toEqual('POST');
      req.flush({ access_token: 'test' });
      expect(token).toEqual({ access_token: 'test' });
    });

    it('should call httpClient.post with the correct URL and wrong data and receive an error', () => {
      let error: HttpErrorResponse | undefined;
      userRequestsService.login({ username: 'test', password: 't' }).subscribe({
        next: () => {
          fail('Expected an error');
        },
        error: (err) => {
          error = err;
        },
      });
      const req = httpTestingController.expectOne(
        'http://localhost:5001/api/login',
      );
      expect(req.request.method).toEqual('POST');
      req.flush(null, {
        status: 401,
        statusText: 'Unauthorized',
      });
      expect(error?.status).toEqual(401);
      expect(error?.statusText).toEqual('Unauthorized');
    });
  });
});
