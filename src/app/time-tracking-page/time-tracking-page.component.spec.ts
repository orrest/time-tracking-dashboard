import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrackingPageComponent } from './time-tracking-page.component';

describe('TimeTrackingPageComponent', () => {
  let component: TimeTrackingPageComponent;
  let fixture: ComponentFixture<TimeTrackingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeTrackingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTrackingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
