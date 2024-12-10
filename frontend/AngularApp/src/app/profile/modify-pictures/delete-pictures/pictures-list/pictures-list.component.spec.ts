import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesListComponent } from './pictures-list.component';

describe('PicturesListComponent', () => {
  let component: PicturesListComponent;
  let fixture: ComponentFixture<PicturesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PicturesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PicturesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});