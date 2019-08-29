import { TestBed } from '@angular/core/testing';

import { LocalStorageControllerService } from './local-storage-controller.service';

describe('LocalStorageControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalStorageControllerService = TestBed.get(LocalStorageControllerService);
    expect(service).toBeTruthy();
  });
});
