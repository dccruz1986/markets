import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MarketsService } from '../markets.service'

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteMarketComponent } from '../modal/delete-market/delete-market.component'
import { AddMarketComponent } from '../modal/add-market/add-market.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';






@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.sass']
})
export class MarketComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = ['name', 'country', 'date', 'lastPrice', 'actions']
  dataSource!: MatTableDataSource<Market>
  // data: Market[] = [];

  @ViewChild(MatAccordion) accordion!: MatAccordion
  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  page!: number
  limit!: number
  pageSizeOptions: number[] = [5, 10, 25, 100];
  markets: Market[] = []
  // pageSizeOptions: number[] = []

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  pageEvent!: PageEvent;

  constructor(
    private MarketsService: MarketsService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {


  }

  ngAfterViewInit() {


    const l_page = localStorage.getItem("page")
    const l_limit = localStorage.getItem("limit")

    this.page = l_page ? parseInt(l_page) : 1
    this.limit = l_limit ? parseInt(l_limit) : 10

    this.getMarkets('')
  }

  getSeverData(event: PageEvent) {

    this.page = event.pageIndex
    this.limit = event.pageSize

    const l_page = localStorage.setItem("page", this.page.toString())
    const l_limit = localStorage.setItem("limit", this.limit.toString())

    this.getMarkets('')

  }


  getMarkets(url: string) {
    this.isLoadingResults = true

    this.MarketsService.get(`${url}?page=${this.page}&limit=${this.limit}`)
      .subscribe((res: any) => {

        this.isLoadingResults = false
        this.dataSource = new MatTableDataSource<Market>(res.data)
        this.resultsLength = res.total
      })

  }

  onDeleteMarket(market: any) {
    const dialogRef = this.dialog.open(DeleteMarketComponent, {
      width: '40%',
      panelClass: 'custom-dialog-panel-class',
      data: { market }
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== market.id)
        this.openSnackBar("Market deleted successfully!!")
        // this.markets = this.markets.filter(item => item.id !== market.id)
      }

    });


  }


  onAddMarkets() {
    const dialogRef = this.dialog.open(AddMarketComponent, {
      width: '40%',
      panelClass: 'custom-dialog-panel-class',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: any) => {

      if (result) {
        this.openSnackBar("Market added successfully!!")
      }
    }

    );

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "OK", {
      duration: 2000
    });
  }


}

export interface Market {
  symbol: string,
  name: string,
  country: string,
  industry: string,
  ipoYear: number,
  marketCap: number,
  sector: string,
  volume: number,
  netChange: number,
  netChangePercent: number,
  lastPrice: number,
  createdAt: Date,
  updatedAt: Date,
  id: number
}

