import { TestBed } from '@angular/core/testing';

import { LibraryStore } from './library-store';

describe('LibraryStore', () => {
  let service: LibraryStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibraryStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
