import { TestBed, inject } from '@angular/core/testing';

import { RetriveRidesService } from './retrive-rides.service';

describe('RetriveRidesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RetriveRidesService]
    });
  });

  it('should be created', inject([RetriveRidesService], (service: RetriveRidesService) => {
    expect(service).toBeTruthy();
  }));
});
