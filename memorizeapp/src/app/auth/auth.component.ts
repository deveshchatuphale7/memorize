import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm!: FormGroup;
  signupForm!: FormGroup;
  viewLoginFlag :boolean = true;

  submitForm(param:any): void {
    console.log(param)
    console.log(this.loginForm.value)
    if(param == "login"){
      this.common.httpPost("/login",this.loginForm.value).subscribe((res:any)=>{

      if(res.msg.length && res.msg[0] == this.loginForm.value.email){
        // this.common.createNotification("info","Login Successful !","Welcome !");
        setTimeout(() => {
           this.common.loginEmail = this.loginForm.value.email; 
           this.common.loginFlag = true;
          localStorage.setItem("email",this.loginForm.value.email);
          this.common.createNotification("info","Hey there !","Welcome !")

setTimeout(() => {
  this.router.navigate(["/main/create"]);
}, 200);
            
          
        }, 500);
      }
      });
    }else if(param == "signup"){
      this.common.httpPost("/signup",this.signupForm.value).subscribe((res:any)=>{

        this.common.createNotification("info","Thank you for signing up"," You can Signin now");
        // this.common.createNotification("info","Signup Successful !","Please Login");
        setTimeout(() => {
          this.viewLoginFlag = true;
        }, 500);
      
      });

    }

  }

  constructor(private fb: FormBuilder,private common :CommonService,private router:Router) {}

  ngOnInit(): void {

    // this.loginForm = this.fb.group({
    //   userName: [null, [Validators.required]],
    //   password: [null, [Validators.required]]
    // });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

//     new FormGroup({          
//       'email':new FormControl(null,Validators.email), //note, can have up to 3 Constructor Params: default value, validators, AsyncValidators
//       'password':new FormControl(null)
//  })

 this.signupForm = this.fb.group({
  name: ['', [Validators.required]],
  email: ['', [Validators.required]],
  password: ['', [Validators.required]],
  cnfpassword: ['', [Validators.required]]
});
 
 
//  new FormGroup({          
//   'email':new FormControl(null,Validators.email), //note, can have up to 3 Constructor Params: default value, validators, AsyncValidators
//   'password':new FormControl(null),
//   'cnfpassword': new FormControl(null)

// })

    // this.signupForm = this.fb.group({
    //   userName: [null, [Validators.required]],
    //   password: [null, [Validators.required]],
    //   cnfpassword: [null, [Validators.required]]
    // });
  }
}
