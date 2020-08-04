import { TestBed } from '@angular/core/testing';

import { Server1Service } from './server1.service';

describe('Server1Service', () => {
  let service: Server1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Server1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
