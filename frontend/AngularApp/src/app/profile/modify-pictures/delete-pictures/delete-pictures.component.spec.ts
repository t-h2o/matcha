import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePicturesComponent } from './delete-pictures.component';

describe('DeletePicturesComponent', () => {
  let component: DeletePicturesComponent;
  let fixture: ComponentFixture<DeletePicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePicturesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeletePicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
