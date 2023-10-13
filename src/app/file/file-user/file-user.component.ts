import { Component, OnInit, ViewChild } from '@angular/core';
import { FileService } from './file.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from './User';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Location } from '@angular/common';


@Component({
  selector: 'app-file-user',
  templateUrl: './file-user.component.html',
  styleUrls: ['./file-user.component.css']
})
export class FileUserComponent implements OnInit {
  isNewStudent =false;
  user : User ={
    Id:'',
    prp_tc: '',
    prp_Ad: '',
    prp_soyisim: '',
    prp_IrtibatKisisiEmail: '',
    DocumentTitle: '',

  }
  userId: string|null|undefined;

  constructor(private fileService:FileService,
    private snackbar:MatSnackBar,
    private router:Router,
    private readonly route:ActivatedRoute,
    private _location: Location
     ){}

  dataSource:MatTableDataSource<User> =new MatTableDataSource<User>();
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    debugger;
    this.route.paramMap.subscribe(
      (params) => {
        this.userId = params.get('Id');

        if(this.userId === "ekle"){
          this.isNewStudent =true;
        }
        else{
          this.isNewStudent = false;
          this.fileService.getUser(this.userId).subscribe(
            (succes) =>{
              this.user =succes;
            },(error) => {

            }
          )
        }
      }
    )
    
      }

  selectedFile!: File;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  
  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.selectedFile as Blob);
    formData.append('userJson', JSON.stringify(this.user));

    this.fileService.uploadFile(formData).subscribe(
     (succes)=>{
      this.snackbar.open('Kullanıcı başarılı bir şekilde eklendi!', undefined, {
        duration: 500
      });
      setTimeout(() =>
          this.router.navigateByUrl('file/%7B580AA4E6-7CEE-458C-8D64-9CD361F868A0%7D'));
          
     } ,
    (error) => {
      console.log(error);
    })
  }



    /*if (!this.selectedFile) {
      return;
    }
    console.log(this.selectedFile.name)
    this.fileService.uploadFile(this.selectedFile)
      .subscribe(
        (response) => {
          console.log('Dosya yükleme başarılı.', response);
        },
        (error) => {
          console.log('Dosya yüklenirken hata oluştu.', error);
        }
      );

      this.fileService.addFile(this.user).subscribe(
        (success) =>{
          this.snackbar.open('Öğrenci başarılı bir şekilde eklendi!',undefined,{
            duration:2000
          })
          setTimeout(() =>{
            this.router.navigateByUrl('');
          })
        },(error) =>{

        }
      )*/

 onUpdate(){
    this.fileService.updateStudent(this.user,this.userId).subscribe(
      (success)=> {
          this.snackbar.open('Kullanıcı Başarılı bir şekilde güncellendi!',undefined,
          {duration:500});
          setTimeout(() =>
          this.router.navigateByUrl('file/%7B580AA4E6-7CEE-458C-8D64-9CD361F868A0%7D'));
      },(error)=>{
          console.log(error);
      }
    )
  }

  onChangeFile(){
    const formData = new FormData();
    formData.append('file', this.selectedFile as Blob);
    formData.append('userJson', JSON.stringify(this.user))

    this.fileService.changeFile(this.userId,formData).subscribe(
      (success)=> {
        this.snackbar.open('Kullanıcı Başarılı bir şekilde güncellendi!',undefined,
        {duration:500});
        setTimeout(() =>
        this.router.navigateByUrl('/file/%7B580AA4E6-7CEE-458C-8D64-9CD361F868A0%7D'));
    },(error)=>{
        console.log(error);
    }
    )
  }

  onLastPage(){
    this._location.back();
  }

}
