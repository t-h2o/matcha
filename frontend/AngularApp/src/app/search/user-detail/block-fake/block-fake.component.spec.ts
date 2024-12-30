import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockFakeComponent } from './block-fake.component';

describe('BlockFakeComponent', () => {
  let component: BlockFakeComponent;
  let fixture: ComponentFixture<BlockFakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockFakeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockFakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
