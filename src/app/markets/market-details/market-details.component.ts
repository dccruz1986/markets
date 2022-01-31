import { Component, OnInit } from '@angular/core';
import { Market } from '../market.component'
import { MarketsService } from './../../markets.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteMarketComponent } from 'src/app/modal/delete-market/delete-market.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddMarketComponent } from './../../modal/add-market/add-market.component';

@Component({
  selector: 'app-market-details',
  templateUrl: './market-details.component.html',
  styleUrls: ['./market-details.component.sass']
})
export class MarketDetailsComponent implements OnInit {

  market!: Market

  constructor(
    private MarketsService: MarketsService,
    public dialog: MatDialog,
    public router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar) {
    // this.market = {} as Market

  }

  ngOnInit(): void {
    let idMarket = this.route.snapshot.params['id'];
    this.getMarket(`/${idMarket}`)
  }

  getMarket(url: string) {
    this.MarketsService.get(url).subscribe((res: any) => {
      this.market = res
    }
    )

  }

  onEditMarket() {
    let market = this.market

    const dialogRef = this.dialog.open(AddMarketComponent, {
      width: '50%',
      panelClass: 'custom-dialog-panel-class',
      data: { market }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.openSnackBar("Market modified successfully!")
        this.market = result
      }

    });

  }

  onDeleteMarket() {
    let market = this.market

    const dialogRef = this.dialog.open(DeleteMarketComponent, {
      width: '40%',
      panelClass: 'custom-dialog-panel-class',
      data: { market }
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.openSnackBar("Market deleted successfully!")
        this.router.navigate([''])


      }

    });

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "OK", {
      duration: 3000
    });
  }

}
