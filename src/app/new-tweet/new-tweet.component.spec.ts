import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTweetComponent } from './new-tweet.component';

describe('NewTweetComponent', () => {
  let component: NewTweetComponent;
  let fixture: ComponentFixture<NewTweetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTweetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
