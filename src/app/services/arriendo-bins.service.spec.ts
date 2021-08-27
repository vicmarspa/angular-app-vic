import { TestBed } from '@angular/core/testing';

import { ArriendoBinsService } from './arriendo-bins.service';

describe('ArriendoBinsService', () => {
  let service: ArriendoBinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArriendoBinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
