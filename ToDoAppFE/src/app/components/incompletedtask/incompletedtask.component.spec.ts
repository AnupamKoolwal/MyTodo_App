import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompletedtaskComponent } from './incompletedtask.component';

describe('IncompletedtaskComponent', () => {
  let component: IncompletedtaskComponent;
  let fixture: ComponentFixture<IncompletedtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncompletedtaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncompletedtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
