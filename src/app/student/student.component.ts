import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ServiceService } from './services/service.service';
import { Student } from './services/student';
import { AuthService } from '../service/auth.service';
import { FileService } from '../file/file-user/file.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students:Student[]=[];
  filterString='';

  displayedColumns:string[] = ['id','name','surname','mail','address','department','edit'];
  dataSource:MatTableDataSource<Student> =new MatTableDataSource<Student>();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private studentService:ServiceService,
    private auth:AuthService,
    private fileService:FileService){}

  ngOnInit(): void {

      this.studentService.getStudents().subscribe(
        (success) =>{
          this.students =success;
          console.log(this.students);
          this.dataSource =new MatTableDataSource<Student>(this.students);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort = this.sort;
        },(error)=>{

        }
      )
  }


  filterStudent(){

    this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
  }

  onSave(){


  }
  logout(){
    this.auth.logout();
  }


}
