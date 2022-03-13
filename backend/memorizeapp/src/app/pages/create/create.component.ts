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
  submitForm(): void {
    console.log('submit', this.validateForm.value);
    console.log(this.validateForm.valid)
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      // this.
      this.common.httpPost("/getmap",this.validateForm.value).subscribe((res:any)=>{
        console.log("res ")
        console.log(res)
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
createChart():void{
  let options  = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'tree',
        data: [{name:"Head",children:[{name:"output 1"},{name:"output 2"},{name:"output 3"},{name:"output 4"},{name:"output 5"},{name:"output 6"}]}],
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
  var e = document.getElementById("chart")!
  console.log(e)
  echarts.dispose(e)
  let chart:any = echarts.init(e);
  chart.setOption(options);  


}

handleCancel():void{

}

handleOk():void{
  
}

  constructor(private fb: FormBuilder,private common: CommonService) {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(6)]],
      language: ['en', []],
      text: ['', [Validators.required]],
    });

   }

  ngOnInit(): void {
  }

}
