import { PostService } from './../app-service.service';
import { Component, OnInit } from '@angular/core';  
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component1Component } from '../component1/component1.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.css']
})
export class Component2Component implements OnInit {


 
    
    constructor(
      private service:PostService, private fb: FormBuilder, 
      private ab:ActivatedRoute,
      private router: Router
      ) {
          
    }  

    id =this.ab.snapshot.paramMap.get('id')
    postData: FormGroup;
    
    
    
  
  
  ngOnInit() {  
  

         this.postData= this.fb.group({
          Name: ['', Validators.required],
          Roll_number: ['', Validators.required],
          Section: ['', Validators.required],
    
        })
        if(this.id){
        this.service.getStudent(this.id).subscribe(
          data => {
            console.log(data)
            this.postData= this.fb.group({
              Name: [data.fields.Name, Validators.required],
              Roll_number: [data.fields.Roll_number, Validators.required],
              Section: [data.fields.Section, Validators.required],
            })
          }
        )
        }
        
  }  


  updateStudent(){
    if(!this.postData.valid){
      return false;
    }
    
    this.service.updateStudent(this.postData, this.id).subscribe(
      data => {
        console.log(data)
        this.router.navigate(["/component1"])
      }
    )
  }
  
  createPost() {  
    if(!this.postData.valid){
      return false
    }
    this.service.addStudent(this.postData).subscribe(
      data => {
        console.log(data);
        this.router.navigate(["/component1"])
      }
    )
  }





  
  deletePost(post) {  
    // this.service.deletePost(post.id)  
    //   .subscribe(response => {  
    //     let index = this.posts.indexOf(post);  
    //     this.posts.splice(index, 1);  
    //   });  
      this.service.deleteStudent(post.id).subscribe(
        data => {
          console.log(data);
          this.ngOnInit();
        }
      )
  }
}