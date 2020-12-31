import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFeedComponent } from './remove-feed.component';

describe('RemoveFeedComponent', () => {
  let component: RemoveFeedComponent;
  let fixture: ComponentFixture<RemoveFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
