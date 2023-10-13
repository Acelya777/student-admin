import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { Student } from '../services/student';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth.service';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../../file/file-user/file.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  userForm!:FormGroup;
  ready=true;
  studentId : string|null|undefined;
  student : Student ={
    id:0,
    name:'',
    surname:'',
    mail:'',
    address:'',
    department:''
  }
  isNewStudent =false;
  header='';

  constructor(private readonly studentService:ServiceService,
    private readonly route:ActivatedRoute,
    private router:Router,
    private snackbar:MatSnackBar,
    private auth:AuthService,
    private http: HttpClient,
    private fileService:FileService){ }


  ngOnInit(): void {

    this.route.paramMap.subscribe(
      (params) => {
        this.studentId =params.get('id');
    //studentId add ise eklemeye göre
        if(this.studentId === "add"){
          this.isNewStudent =true;
          this.header = "Öğrenci Ekle"
        }
        else{
          this.isNewStudent = false;
          this.header = "Öğrenci Düzenle"
        }
    //değilse edite
        this.studentService.getStudent(this.studentId).subscribe(
          (succes) =>{
            this.student =succes;
          },(error) => {

          }
        )
      }
    )
  }

  logout(){
    this.auth.logout();
  }


  onUpdate(){

    this.studentService.updateStudent(this.student).subscribe(
      (success) =>{
        this.router.navigateByUrl('student');
        this.snackbar.open('Öğrenci başarılı bir şekilde güncellendi!',undefined,{
          duration:2000
        })
      },(error) =>{

      }
    )
  }

  onDelete(){

    this.studentService.deleteStudent(this.student.id).subscribe(
      (success) =>{
        this.snackbar.open('Öğrenci başarılı bir şekilde silindi!',undefined,{
          duration:500
        })
        this.ready=false;
        setTimeout(() =>{

          this.router.navigateByUrl('student');
        },2000)
      },(error)=>{

      }
    )
  }


  onAdd(){

    this.studentService.addStudent(this.student).subscribe(
      (success) =>{
        this.snackbar.open('Öğrenci başarılı bir şekilde eklendi!',undefined,{
          duration:2000
        })
        this.ready=false;
        setTimeout(() =>{
          this.router.navigateByUrl('student');
        })
      },(error) =>{

      }
    )

  }
}
