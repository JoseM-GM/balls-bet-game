import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CommunicatorService } from './communicator.service';

describe('CommunicatorService', () => {
  let service: CommunicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should trigger observable bet list value', () => {
    service.announcedRefreshList$.subscribe(value => {
      expect(value).toEqual([1,5,6,9]);
    });
    service.announceRefreshList([1,5,6,9]);
  })

  it('should trigger observable value of the bet', () => {
    service.announcedPlacedBet$.subscribe(value => {
      expect(value).toBe(5);
    });
    service.announcePlacedBet(5);
  })
});
