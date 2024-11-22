import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpRequestsService } from './http.requests.service';
import { PotentialMatchService } from './potentialMatch.service';
import { ToastService } from './toast.service';
import { emptyUser } from '../models/emptyUser';
import { UserData } from '../models/data-to-api/user';

describe('PotentialMatchService', () => {
  let potentialMatchService: PotentialMatchService;
  let httpTestingController: HttpTestingController;
  let httpRequestsService: HttpRequestsService;
  let toastService: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PotentialMatchService,
        HttpRequestsService,
        ToastService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    potentialMatchService = TestBed.inject(PotentialMatchService);
    httpRequestsService = TestBed.inject(HttpRequestsService);
    toastService = TestBed.inject(ToastService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('creation and initial values', () => {
    it('should be created', () => {
      expect(potentialMatchService).toBeTruthy();
    });

    it('set initial value for potentialMatches', () => {
      expect(potentialMatchService.potentialMatches()).toEqual([]);
      expect(potentialMatchService.otherProfileData()).toEqual(emptyUser);
    });
  });

  describe('getAllPotentialMatches', () => {
    it('should call getPotentialMatches with the correct URL and data and receive potential matches', () => {
      potentialMatchService.getAllPotentialMatches();
      const req = httpTestingController.expectOne(
        'http://localhost:5001/api/browsing',
      );
      expect(req.request.method).toEqual('GET');
    });
  });

  describe('getUserProfileByUsername', () => {
    it('should call getUserByUsername with the correct URL and data and receive a user', () => {
      potentialMatchService.getUserProfileByUsername('test');
      const req = httpTestingController.expectOne(
        'http://localhost:5001/api/users?username=test',
      );
      expect(req.request.method).toEqual('GET');
    });
  });

  describe('viewProfile', () => {
    it('should call visitProfile with the correct URL and data and receive nothing', () => {
      potentialMatchService.viewProfile('test');
      const req = httpTestingController.expectOne(
        'http://localhost:5001/api/visit-profile',
      );
      expect(req.request.method).toEqual('POST');
    });
  });
});
