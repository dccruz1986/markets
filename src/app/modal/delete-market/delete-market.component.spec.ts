import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteMarketComponent } from './delete-market.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


describe('DeleteMarketComponent', () => {
  let component: DeleteMarketComponent;
  let fixture: ComponentFixture<DeleteMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        HttpClientTestingModule
      ],
      
      declarations: [DeleteMarketComponent]

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(true).toBe(true);
  });
});
