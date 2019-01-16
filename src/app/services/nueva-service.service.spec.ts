import { TestBed } from '@angular/core/testing';

import { NuevaServiceService } from './nueva-service.service';

describe('NuevaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NuevaServiceService = TestBed.get(NuevaServiceService);
    expect(service).toBeTruthy();
  });
});
