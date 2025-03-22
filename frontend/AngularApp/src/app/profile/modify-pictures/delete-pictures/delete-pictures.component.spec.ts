import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePicturesComponent } from './delete-pictures.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PicturesListComponent } from './pictures-list/pictures-list.component';

describe('DeletePicturesComponent', () => {
  let component: DeletePicturesComponent;
  let fixture: ComponentFixture<DeletePicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePicturesComponent, PicturesListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(DeletePicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
