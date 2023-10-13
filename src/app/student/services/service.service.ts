import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Student} from './student'
import {updateStudentRequest } from './updateStudentRequest'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseApiUrl ='http://localhost:8080';

  constructor(private httpClient:HttpClient) { }

  public getStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(`${this.baseApiUrl}/student/all`);
  }

  public getStudent(studentId:string|null|undefined): Observable<Student>{
    return this.httpClient.get<Student>(this.baseApiUrl+'/student/find/'+studentId);
  }

  public updateStudent(student:updateStudentRequest): Observable<Student>{
    return this.httpClient.put<Student>(this.baseApiUrl+'/student/update',student);
  }

  public deleteStudent(studentId:number): Observable<Student>{
    return this.httpClient.delete<Student>(this.baseApiUrl+'/student/delete/'+studentId);
  }

  public addStudent(student:Student): Observable<Student>{
    return this.httpClient.post<Student>(this.baseApiUrl+'/student/add',student);
  }

}
