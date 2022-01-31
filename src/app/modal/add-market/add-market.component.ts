import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarketsService } from '../../markets.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '@narik/custom-validators';


@Component({
  selector: 'app-add-market',
  templateUrl: './add-market.component.html',
  styleUrls: ['./add-market.component.sass']
})
export class AddMarketComponent implements OnInit {

  error: any = ''
  public formMarket: FormGroup | undefined;
  isEdit = this.data.market ? "Edit Market" : "Add Market"

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private MarketsService: MarketsService,
    public dialogRef: MatDialogRef<AddMarketComponent>,
    private formBuilder: FormBuilder
  ) {
    this.error = ''
  }

  ngOnInit(): void {
    this.buildForm()
  }

  private buildForm() {

    this.formMarket = this.formBuilder.group(
      {
        // ipv4: [this.data.market ? this.data.market.country : "", [Validators.required, Validators.pattern(/^(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){4}$/)]],

        symbol: [this.data.market ? this.data.market.symbol : "", [Validators.min(3), Validators.max(10), Validators.required]],
        name: [this.data.market ? this.data.market.name : "", [Validators.min(3), Validators.max(100), Validators.required]],
        country: [this.data.market ? this.data.market.country : "", [Validators.min(3), Validators.max(50), Validators.required]],
        industry: [this.data.market ? this.data.market.industry : "", [Validators.min(3), Validators.max(50), Validators.required]],
        ipoYear: [this.data.market ? this.data.market.ipoYear : "", [Validators.required, Validators.min(1900), Validators.max(2100), CustomValidators.number]],
        marketCap: [this.data.market ? this.data.market.marketCap : "", [Validators.required]],
        sector: [this.data.market ? this.data.market.sector : "", [Validators.required, Validators.min(3), Validators.max(50)]],
        volume: [this.data.market ? this.data.market.volume : "", [Validators.required, CustomValidators.number]],
        netChange: [this.data.market ? this.data.market.netChange : "", [Validators.required, CustomValidators.number]],
        netChangePercent: [this.data.market ? this.data.market.netChangePercent : "", [Validators.required, Validators.min(0), Validators.max(100), CustomValidators.number]],
        lastPrice: [this.data.market ? this.data.market.lastPrice : "", [Validators.required, CustomValidators.number]],
        createdAt: [this.data.market ? this.data.market.createdAt : new Date(), [Validators.required, CustomValidators.date]],
        updatedAt: new Date(),

      }
    );
  }

  onAddMarket() {
    if (this.formMarket?.valid) {
      if (!this.data.market) {
        this.MarketsService.post("", this.formMarket?.value)
          .subscribe((res: any) => {
            this.dialogRef.close(res)
          },
            (error: any) => {
              this.error = "Something happend!! Try again later "
              if (error.status == 400)
                this.error = error.error;
              setTimeout(() => {
                this.error = ""
              }, 5000)

            }
          )
      }
      else {
        this.MarketsService.patch(`/${this.data.market.id}`, this.formMarket?.value)
          .subscribe((res: any) => {

            this.dialogRef.close(res)
          },
            (error: any) => {
              this.error = "Something happend! Try again later "
              if (error.status == 400)
                this.error = error.error;
              setTimeout(() => {
                this.error = ""
              }, 5000)

            }
          )
      }
    }
  }

  onCancel() {
    this.dialogRef.close()


  }

}
