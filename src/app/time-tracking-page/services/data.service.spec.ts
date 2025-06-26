import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import {HttpTestingController} from '@angular/common/http/testing';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tracks data', () => {
    const mockData = [
      {
        title: 'Work',
        timeframes: {
          daily: { current: 5, previous: 7 },
          weekly: { current: 32, previous: 36 },
          monthly: { current: 103, previous: 128 }
        }
      }
    ];

    service.getTracks().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should handle error when API fails', () => {
    service.getTracks().subscribe({
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne('data.json');
    req.flush('Error', { status: 404, statusText: 'Not Found' });
  });

});
