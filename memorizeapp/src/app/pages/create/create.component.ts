import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import * as echarts from 'echarts';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  validateForm:FormGroup;
  showModal:boolean = false;
  mapData:any = [];
  chartChildren :any = [];
  submitForm(): void {
    console.log('submit', this.validateForm.value);
    console.log(this.validateForm.valid)
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
       this.chartChildren.splice(0,this.chartChildren.length);
       this.validateForm.value.text = this.validateForm.value.text.replaceAll("'","");
       this.validateForm.value.text = this.validateForm.value.text.replaceAll('"','')  
       this.validateForm.value.text = this.validateForm.value.text.replaceAll(',',' ')  

      this.common.httpPost("/getmap",this.validateForm.value).subscribe((res:any)=>{
        console.log("res ")
        console.log(res)
        this.mapData = res.keyphrase_data.slice(0,8);
        
        for(let itr=0;itr<this.mapData.length;itr++){
          this.chartChildren.push({name:this.mapData[itr][1]})
        } 
        this.clickB();
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  clickB():void{
    this.showModal = true
    setTimeout(() => {
      this.createChart()  
    }, 500);
    

  }
  
  chartO:any

createChart():void{
  let options  = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'tree',
        data: [{name:this.validateForm.value.title,children:
          // [{name:"output 1"},{name:"output 2"},{name:"output 3"},{name:"output 4"},{name:"output 5"},{name:"output 6"}]
          this.chartChildren
        }],
        top: '18%',
        bottom: '14%',
        layout: 'radial',
        symbol: 'emptyCircle',
        symbolSize: 7,
        initialTreeDepth: 3,
        animationDurationUpdate: 750,
        emphasis: {
          focus: 'descendant'
        }
      }
    ]
  }
  this.chartO = document.getElementById("chart")!
  // console.log(this.chartO)
  echarts.dispose(this.chartO)
  let chart:any = echarts.init(this.chartO);
  chart.setOption(options);  


}

handleCancel():void{
  console.log("Cancel Clicked");
  echarts.dispose(this.chartO)
  this.showModal = false;

}

handleOk():void{
  let id = Math.floor(Math.random() * 100);
  let sendObj:any= {};
  sendObj["id"] = id;
  sendObj["title"] = this.validateForm.value.title;
  sendObj["email"] = localStorage.getItem("email");

  sendObj["text"] = this.validateForm.value.text;
  let metaObj:any = {};

  metaObj["language"] = this.validateForm.value.language;
  metaObj["words"] = this.mapData;
  metaObj["tags"] = [];
  metaObj["createdOn"] = new Date();
  sendObj["metaData"] = JSON.stringify(metaObj);

  this.common.httpPost("/savemap",sendObj).subscribe((res:any)=>{
        console.log("res savemap ")
        console.log(res)
        if(res.msg != "err"){
          this.showModal = false;
        }
      });

}
obj={'width':"80%"}

  constructor(private fb: FormBuilder,private common: CommonService) {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      language: ['en', []],
      text: ['', [Validators.required]],
    });

   }

  ngOnInit(): void {
  }

}
