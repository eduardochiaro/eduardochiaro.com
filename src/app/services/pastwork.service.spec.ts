import { TestBed, inject } from '@angular/core/testing';

import { PastworkService } from './pastwork.service';

describe('PastworkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PastworkService]
    });
  });

  it('should be created', inject([PastworkService], (service: PastworkService) => {
    expect(service).toBeTruthy();
  }));
});
