import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MarketsService } from '../../markets.service'

@Component({
  selector: 'app-delete-market',
  templateUrl: './delete-market.component.html',
  styleUrls: ['./delete-market.component.sass']
})
export class DeleteMarketComponent implements OnInit {

  error:string = ''


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private MarketsService: MarketsService,
    public dialogRef: MatDialogRef<DeleteMarketComponent>
  ) { }

  ngOnInit(): void {
  }

  onDelete() {
    
    this.MarketsService.delete(`/${this.data.market.id}`)
      .subscribe((res: any) => {
        this.dialogRef.close(true)
      },
        (error:any) => {
          this.error = "Something happend! Try again later "
          if (error.status == 400)
            this.error = error.error;
          setTimeout(() => {
            this.error = ""
          }, 5000)

        }
      )


  }

  onCancel() {
    this.dialogRef.close(false)


  }

}
