import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReadingModalComponent } from './add-reading-modal.component';

describe('AddReadingModalComponent', () => {
  let component: AddReadingModalComponent;
  let fixture: ComponentFixture<AddReadingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReadingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReadingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
