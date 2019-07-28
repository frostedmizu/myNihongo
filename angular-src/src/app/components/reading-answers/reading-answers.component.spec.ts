import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingAnswersComponent } from './reading-answers.component';

describe('ReadingAnswersComponent', () => {
  let component: ReadingAnswersComponent;
  let fixture: ComponentFixture<ReadingAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
