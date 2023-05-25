import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedtaskComponent } from './completedtask.component';

describe('CompletedtaskComponent', () => {
  let component: CompletedtaskComponent;
  let fixture: ComponentFixture<CompletedtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedtaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
