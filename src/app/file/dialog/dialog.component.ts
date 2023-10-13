import { Component, OnInit } from '@angular/core';
import { FileService } from '../file-user/file.service';
import { Document } from '../file-user/Document';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  folders:Document[]=[];
  selectedSentFolder:string='';
  selectedSentPath:string='';
  

  constructor(private fileService:FileService,
    public snackbar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string },
    public dialog: MatDialog){}

  ngOnInit(): void {
    this.fileService.getAllDocuments().subscribe(
      (success) => {
       this.folders= success;
       console.log(this.folders);
      }, (error)=>{

      })
    }
    // userId:string | undefined;
    // selectedDocument = this.document.find(doc => doc.id === this.userId);
     ONMOVE(selectedSentPath:string,selectedSentFolder:string){
      debugger;
       this.fileService.MoveFile(this.data.userId,selectedSentPath,selectedSentFolder).subscribe(
        (success)=>{
          this.snackbar.open('Dosya başarılı bir şekilde taşındı!',undefined,{
            duration:500
          })
          this.dialog.closeAll();
        },(error)=>{
          console.log(error);
          console.log(selectedSentFolder,selectedSentPath)
        }
       )
    }
  }
 



