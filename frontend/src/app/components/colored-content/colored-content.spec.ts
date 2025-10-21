import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoredContent } from './colored-content';

describe('ColoredContent', () => {
  let component: ColoredContent;
  let fixture: ComponentFixture<ColoredContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColoredContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColoredContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
