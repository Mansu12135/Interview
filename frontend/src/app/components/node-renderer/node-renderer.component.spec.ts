import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeRendererComponent } from './node-renderer.component';

describe('NodeRendererComponent', () => {
  let component: NodeRendererComponent;
  let fixture: ComponentFixture<NodeRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodeRendererComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
