import { TestBed } from '@angular/core/testing';

import { HttpbaseService } from './httpbase.service';

describe('HttpbaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpbaseService = TestBed.get(HttpbaseService);
    expect(service).toBeTruthy();
  });
});
