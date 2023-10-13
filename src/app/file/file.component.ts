import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FileService } from './file-user/file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './file-user/User';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { bootstrapApplication } from '@angular/platform-browser';
import { MatTreeFlatDataSource } from '@angular/material/tree';

import { MatList } from '@angular/material/list';
import { Document } from './file-user/Document';
import { DialogComponent } from './dialog/dialog.component';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent {
  user:User[]=[];
  document:Document[]=[];
  
  filterString='';
  selectedFolderId: string = '';

  displayedColumns:string[] = [
    'Id',
    'prp_tc',
    'prp_Ad',
    'prp_soyisim',
    'prp_IrtibatKisisiEmail',
    'DocumentTitle',
    'edit',
    'delete',
    'download',
    'moving'];

  dataSource:MatTableDataSource<User> =new MatTableDataSource<User>();
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatList) list!:MatList;

  constructor( private fileService:FileService,
    private snackbar:MatSnackBar,
    private router:Router,
    private readonly route:ActivatedRoute,
    private authService:AuthService,
    private http:HttpClient,
    public dialog: MatDialog,
    
     ){}
      ngOnInit(): void {
        this.isSidebarOpen = !this.isSidebarOpen;
        this.fileService.getAllDocuments().subscribe(
          (success) => {
            this.document=success;
          }, (error)=> {
            console.log(error)
          }
        );
        
        
          this.onCurrent();
        
      }
      isSidebarOpen: boolean = false;

      toggleOffcanvas() {
        this.isSidebarOpen = !this.isSidebarOpen;
        this.fileService.getAllDocuments().subscribe(
          (success) => {
            this.document=success;
          }, (error)=> {
            console.log(error)
          }
        )
        
        } 

        onCurrent(){
          this.fileService.getAllUser().subscribe(
            (success) =>{
              this.user =success;
              console.log(this.user);
              this.dataSource =new MatTableDataSource<User>(this.user);
              this.dataSource.paginator=this.paginator;
              this.dataSource.sort = this.sort;
              
            },(error)=>{
                console.log('error')
            }
          )
        }

    onDelete(userId:string){
      this.fileService.deleteUser(userId).subscribe(
        (success) =>{
          this.snackbar.open('Öğrenci başarılı bir şekilde silindi!',undefined,{
            duration:500
          });
          setTimeout(() => {
            this.selectFile(this.selectedFolderId);
            this.onCurrent();
          });
         
        },(error)=>{

        }
      )
    }
    

    onDownload(userId: string) {
      return this.http.get(`http://localhost:8080/download/${userId}`, { responseType: 'blob' }).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      });
    }

    onMoving(userId: string){
      const dialogRef = this.dialog.open(DialogComponent,{
        data: { userId: userId }
      });
      
    }

    selectFile(folderId:string){
      this.selectedFolderId = folderId;
      this.fileService.selectFile(folderId).subscribe(
        (success)=>{
          this.user =success;
          console.log(this.user);
          this.dataSource =new MatTableDataSource<User>(this.user);
          this.dataSource.paginator=this.paginator;
          
        },(error)=>{
          console.log(error);
        }
      )
    }


    logout(){
        this.authService.logout();
    }

    filterStudent(){
      this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
    }
  
}
