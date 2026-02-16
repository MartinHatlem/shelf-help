import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingList } from './reading-list';

describe('ReadingList', () => {
  let component: ReadingList;
  let fixture: ComponentFixture<ReadingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
