import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVocabComponent } from './edit-vocab.component';

describe('EditVocabComponent', () => {
  let component: EditVocabComponent;
  let fixture: ComponentFixture<EditVocabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVocabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVocabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
