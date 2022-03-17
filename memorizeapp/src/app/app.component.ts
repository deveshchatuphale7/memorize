import { Component } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  logout():void{
    this.common.loginEmail = "";
    this.common.loginFlag =false;
    
    setTimeout(() => {
      localStorage.clear();
      this.router.navigate(["/auth"]);  
    }, 500);
  }
  constructor(public common:CommonService,private router:Router){

  }

  ngOnInit(): void {
    if(localStorage.getItem("email")){
      this.common.loginFlag = true;
      this.common.loginEmail = localStorage.getItem("email")!;
    }
    
  }
}
