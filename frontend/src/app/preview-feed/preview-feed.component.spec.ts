import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFeedComponent } from './preview-feed.component';

describe('PreviewFeedComponent', () => {
  let component: PreviewFeedComponent;
  let fixture: ComponentFixture<PreviewFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
