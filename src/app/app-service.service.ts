import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Injectable } from '@angular/core';  
import { Observable } from 'rxjs';
  
@Injectable({  
  providedIn: 'root'  
})  
export class PostService {  
  
  private url = 'https://jsonplaceholder.typicode.com/posts';  
    
  constructor(private http: HttpClient) { }  
  
  getPosts(): Observable<any[]> {  
    return this.http.get<any>(this.url);  
  }  
  
  createPost(post) {  
    return this.http.post(this.url, JSON.stringify(post))  
  }  
  
  updatePost(post){  
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true }))  
  }  
  
  deletePost(id) {  
    return this.http.delete(this.url + '/' + id);  
  }  
  getHeader(){
    
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer keyBX6I3IUyM0a7Hn`
    })
  }
 geStudentsList(){
   return this.http.get<any>("https://api.airtable.com/v0/appOVD59r31Iw3b47/Table%201",{headers:this.getHeader()} )
 } 

 addStudent(data){
   let t = {
    "records": [
      {
        "fields": {
          "Name": data.get("Name").value,
          "Roll_number": data.get("Roll_number").value,
          "Section": data.get("Section").value
        }
      }
    ]
  }
  console.log(t)
  return this.http.post<any>("https://api.airtable.com/v0/appOVD59r31Iw3b47/Table%201", t, {headers:this.getHeader()})

}
  deleteStudent(id){
    console.log(id)
    return this.http.delete<any>("https://api.airtable.com/v0/appOVD59r31Iw3b47/Table%201"+ "/" + id, {headers: this.getHeader()})
  }

  updateStudent(data, id){
    console.log(data)
    let t = {
      "records": [
        {
          "id": id,
          "fields": {
            "Name": data.get("Name").value,
            "Roll_number": data.get("Roll_number").value,
            "Section": data.get("Section").value
          }
        }
      ]
    }
    return this.http.patch<any>("https://api.airtable.com/v0/appOVD59r31Iw3b47/Table%201", t, {headers: this.getHeader()})
  }

  getStudent(id){
    return this.http.get<any>("https://api.airtable.com/v0/appOVD59r31Iw3b47/Table%201"+ "/"+ id,{headers:this.getHeader()} )
  }



}