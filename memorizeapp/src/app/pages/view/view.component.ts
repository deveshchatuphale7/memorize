import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import * as echarts from 'echarts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  allChartData:any;
  selectedTitle:string = "";
  isVisible:boolean = false;
  selectedDate:Date = new Date();
  selectedText:String = '';
    viewFullscreen(index:number):void{
       
        this.selectedTitle = this.allChartData[index][2];
        this.selectedDate = this.allChartData[index].createdOn;
        this.selectedText = this.allChartData[index][3];
        this.showModal()
        setTimeout(() => {

          let op = JSON.parse(this.allChartData[index][4]);
            this.allChartData[index].createdOn = op.createdOn;
            // console.log(op)
            let chartChildren:any = [];
            for(let itr=0;itr<op.words.length;itr++){
              chartChildren.push({name:op.words[itr][1]})
            } 
           
            let options  = {
              title:{
                show:false
              },
              toolbox: {
                showTitle: false,
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                  restore: { show: true },
                  saveAsImage: { show: true }
                }
              },
              tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
              },
              series: [
                {
                  type: 'tree',
                  data: [{name:this.allChartData[index][2],
                    children:
                    // [{name:"output 1"},{name:"output 2"},{name:"output 3"},{name:"output 4"},{name:"output 5"},{name:"output 6"}]
                    chartChildren
                  }],
                  top: '18%',
                  bottom: '14%',
                  layout: 'radial',
                  symbol: 'emptyCircle',
                  // symbolSize: 7,
                  initialTreeDepth: 3,
                  animationDurationUpdate: 750,
                  lineStyle:{
                    width:3,
                     curveness:0
                  },
                  
                 label:{
                   rotate:0,
                 },
                  emphasis: {
                    focus: 'descendant'
                  }
                }
              ]
            }
          let chart = echarts.init(document.getElementById("mychart")!);
          chart.setOption(options);  
        }, 500);
        
    


    }

    
  getData():void{
    this.common.httpPost("/getallmaps",{email:localStorage.getItem("email")}).subscribe((res:any)=>{
      console.log("res get ")
      console.log(res)
      if(res.msg != "err"){
        this.allChartData = res.msg;
        // this.showModal = false;

        setTimeout(() => {
          this.allChartData.forEach((element:any,index:number) => {
            let chart = echarts.init(document.getElementById("mychart"+index)!);
            let op = JSON.parse(element[4]);
            this.allChartData[index].createdOn = op.createdOn;
            console.log(op)
            let chartChildren:any = [];
            for(let itr=0;itr<op.words.length;itr++){
              chartChildren.push({name:op.words[itr][1]})
            } 
           
            let options  = {
              title:{
                show:false
              },
              tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
              },
              series: [
                {
                  type: 'tree',
                  data: [{name:this.allChartData[index][2],
                    children:
                    // [{name:"output 1"},{name:"output 2"},{name:"output 3"},{name:"output 4"},{name:"output 5"},{name:"output 6"}]
                    chartChildren
                  }],
                  top: '18%',
                  bottom: '14%',
                  layout: 'radial',
                  symbol: 'emptyCircle',
                  // symbolSize: 7,
                  initialTreeDepth: 3,
                  animationDurationUpdate: 750,
                  lineStyle:{
                    width:3,
                     curveness:0
                  },
                  
                 label:{
                   rotate:0,
                 },
                  emphasis: {
                    focus: 'descendant'
                  }
                }
              ]
            }
              // op["toolbox"]["show"] = false;
            chart.setOption(options);
          });
        }, 1000);
      }
    });

  }

      showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  constructor(private common:CommonService,private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("email")){
      this.common.loginFlag = true;
      this.getData();
    }else{
      this.router.navigate(["/auth"]);  

    }
    
  }

}
