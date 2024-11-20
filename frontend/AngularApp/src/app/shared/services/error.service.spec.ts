import { TestBed } from '@angular/core/testing';
import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('showError', () => {
    it('should set error', () => {
      service.showError('test');
      expect(service.error()).toBe('test');
    });
  });

  describe('clearError', () => {
    it('should clear error', () => {
      service.clearError();
      expect(service.error()).toBe('');
    });
  });
});
