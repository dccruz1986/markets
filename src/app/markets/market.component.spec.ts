import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarketComponent } from './market.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarketsService } from '../markets.service';
import { Observable } from 'rxjs-compat/Observable';


describe('MarketComponent', () => {
  let component: MarketComponent;
  let fixture: ComponentFixture<MarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [

        MatDialogModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      declarations: [MarketComponent]
    })
      .compileComponents()
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shuold componet Markets is created ', () => {

    expect(component).toBeTruthy()
  });

  it("it should get a Marketss ", () => {
    const httpTestingController = TestBed.inject(HttpTestingController)
    const MarketsService: MarketsService = TestBed.inject(MarketsService)

    const responseMarkets = [{
      "devices": [],
      "name": "Example3",
      "ipv4": "10.2.21.2"
    }]

    let result
    MarketsService.get("/")

    const req = httpTestingController.expectOne("http://localhost:3000/api/Marketss/")

    expect(req.request.url).toEqual("http://localhost:3000/api/Marketss/")
    expect(req.request.method).toEqual('GET')
    req.flush(responseMarkets)


  })

});
