import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockFakeComponent } from './block-fake.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BlockFakeComponent', () => {
  let component: BlockFakeComponent;
  let fixture: ComponentFixture<BlockFakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockFakeComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockFakeComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('username', 'testUser');
    fixture.componentRef.setInput('isBlocked', false);
    fixture.componentRef.setInput('isFake', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
