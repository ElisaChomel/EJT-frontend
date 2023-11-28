import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-account-dialog',
  templateUrl: './confirm-delete-account-dialog.component.html',
  styleUrls: ['./confirm-delete-account-dialog.component.scss']
})
export class ConfirmDeleteAccountDialogComponent {
  public confirmDelete: boolean = false;
  
  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteAccountDialogComponent>) {}

  onChange(event: MatCheckboxChange): void{
    this.confirmDelete = event.checked; 
  }

  close(value: boolean): void{
    this.dialogRef.close(value);
  }
}
