import { PostService } from './../app-service.service';
import { Component, OnInit } from '@angular/core';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
  
@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
}) 
export class Component1Component implements OnInit {  
    
  posts=[];  
  update = false;
  update_id = "";
 
    
    constructor(private service:PostService, private fb: FormBuilder,
      private router: Router) {  
      
    }  
    postData: FormGroup;
    
    
    
  
  
  ngOnInit() {  

      this.service.geStudentsList().subscribe(
        response => {  
          console.log(response)
          this.posts=response.records;
        }
         )  

         this.postData= this.fb.group({
          Name: ['', Validators.required],
          Roll_number: ['', Validators.required],
          Section: ['', Validators.required],
    
        })
  }  
  
  createPost() {  
    if(!this.postData.valid){
      return false
    }
    this.service.addStudent(this.postData).subscribe(
      data => {
        console.log(data);
        this.ngOnInit();
      }
    )
  }
  
  updatePost(post) {  
    this.update = false;
    this.update_id = post.id;

    // this.postData= this.fb.group({
    //   Name: [post.fields.Name, Validators.required],
    //   Roll_number: [post.fields.Roll_number, Validators.required],
    //   Section: [post.fields.Section, Validators.required],

    //})
    this.router.navigate(['component2/'+this.update_id]);

  }
  updateStudent(){
    if(!this.postData.valid){
      return false;
    }
    
    this.service.updateStudent(this.postData, this.update_id).subscribe(
      data => {
        console.log(data)
        this.update = false;
        this.update_id = "id"
        this.ngOnInit()
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
  
   my() {
        var x = document.getElementById("se");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
//   firstData()
//   if(this.postData.invalid){
//     return false;
//   }
//   if(this.appService.formData.length==0){
//     this.appService.submit(this.postData);
//   }
  
//   this.router.navigate(['component2']);
// }
}  
