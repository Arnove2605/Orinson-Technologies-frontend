import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseURL:string="https://localhost:7116/api/"
  constructor(private http:HttpClient,private route:Router){}

  onsubmit(ContactObj:any){
    return this.http.post<any>(`${this.baseURL}Contact`,ContactObj)
  }

}
