import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

constructor(
    public dialogo: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

    closeDialog(): void {
      this.dialogo.close(false);
    }
    confirm(): void {
      this.dialogo.close(true);
    }

  ngOnInit() {
  }

}