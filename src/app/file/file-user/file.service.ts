import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { updateUser } from './updateUser';
import { User } from './User';
import { Document } from './Document';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl='http://localhost:8080';

  constructor(private http:HttpClient) { }

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`,formData);
  }

  public getAllUser(): Observable<User[]>{
    const folderId='580AA4E6-7CEE-458C-8D64-9CD361F868A0';
    return this.http.get<User[]>(`${this.baseUrl}/${folderId}/documents`);
  }

  public getUser(userId:string|null|undefined): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/${userId}/properties`);
  }

  public updateStudent(user:updateUser,userId:string|null|undefined): Observable<User>{
    return this.http.put<User>(`${this.baseUrl}/${userId}/update`,user);
  }

  public deleteUser(userId:string){
    return this.http.delete<User>(`${this.baseUrl}/${userId}/delete`);
  }

  public getAllDocuments(): Observable<Document[]>{
    const folderId='0F1E2D3C-4B5A-6978-8796-A5B4C3D2E1F0';
    return this.http.get<Document[]>(`${this.baseUrl}/Alldocuments/${folderId}`);
  }

  public changeFile(userId:string|null|undefined,formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/changeFile/${userId}`,formData);
  }
  
  public MoveFile(folderId:string,FolderPath:String,FolderName:String){
    return this.http.get(`${this.baseUrl}/Target/${folderId}/${FolderPath}/${FolderName}`);
  }

  public selectFile(folderId:string):Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/${folderId}/documents`);
  }

  

  /*public uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');

    return this.http.post<any>('http://localhost:8080/upload', formData, { headers });
  }

  public addFile(user:User): Observable<User>{
    debugger;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post<User>('http://localhost:8080/upload',user,{ headers });
  }*/
}
