import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculator';
  operand1:string="0"
  operand2:string="0"
  operator:string=""
  equation:string=""
  b:any=0
  inverse:any
  /* prev which is used when there is a number before operand*/
  prev:string=""
  calculated:boolean=false
  /*falg=false the turn og operand*/ 
  flag:boolean=true
  temp:string=""
  res:string=""
  constructor(private http:HttpClient){}
  add(sign:string,op1:string,op2:string){
    this.http.get('http://localhost:8088/cal/evaluate',{
      responseType:'text',
    params:{
    z:sign,
    x:op1,
    y:op2
  },observe:'response'}).subscribe(response=>{
    this.b=response.body
    console.log(this.b)
  })}
  invert(op1:string){
    this.http.get('http://localhost:8088/cal/inverse',{
    responseType:'text',
    params:{
    x:op1,
     },
    observe:'response'}).subscribe(response=>{
      this.b=response.body
      console.log(this.b)
    })
  }
  sqrt(op1:string){
    this.http.get('http://localhost:8088/cal/square',{
    responseType:'text',
    params:{
    x:op1,
     },
    observe:'response'}).subscribe(response=>{
      this.b=response.body
      console.log(this.b)
    })
  }
  percent(operator:string,op1:string,op2:string){
    this.http.get('http://localhost:8088/cal//percent',{
    responseType:'text',
    params:{
    operation:operator,
    x:op1,
    y:op2
  },
    observe:'response'}).subscribe(response=>{
      this.b=response.body
      console.log(this.b)
    })
  }
  plus(op1:string){
    this.http.get('http://localhost:8088/cal//plusminus',{
    responseType:'text',
    params:{
    x:op1,
  },
    observe:'response'}).subscribe(response=>{
      this.b=response.body
      console.log(this.b)
    })
  }
  power(op1:string){
    this.http.get('http://localhost:8088/cal//powering',{
    responseType:'text',
    params:{
    x:op1,
  },
    observe:'response'}).subscribe(response=>{
      this.b=response.body
      console.log(this.b)
    })
  }
  /*function to take operator and store operand1(second one)=operand2*/ 
  operatortaken(text:string){
    if(this.operator==='' && this.calculated===false){
      if(this.operand1===''){
        this.operand2='0'
        this.equation='0'
      }
      else
      {this.operand2=this.operand1
       this.operand1=''
    }
    this.operator=text
    this.equation=this.equation+this.operator
    this.flag=true
    }
   // else if(this.operator!=='²'){

    //}
    else if(this.calculated===true){
       this.equation=""
       this.operand1=""
       this.operator=text
       this.operand2=this.b
       this.equation=this.equation +this.b+this.operator
       this.calculated=false
    }
  }
  //powering the number
  /*pawn(y:string){
    this.equation=this.equation+y
    this.add("²",this.operand1,this.operand2)
  }*/
  /*to make sure that it is number only */
  displaynumber(y:string){
    if(this.calculated) {
       this.clear()
      }
    if(this.flag){
      this.flag=false
    }
    this.operand1=this.operand1+y
    /*expression of arthmatic equation*/ 
    this.equation=this.equation+y
    this.calculated=false
  }
  
  clear(){
    this.equation=""
    this.operand1=""
    this.operator=""
    this.operand2=""
    this.calculated=false
    this.b=""
  }
  dot(){
    if(this.operand1.indexOf('.') === -1){
      this.displaynumber('.');
    }
  }
  delete(){
    this.temp = this.equation.charAt(this.equation.length-1);
    if(this.temp==='-'||this.temp==='X'||this.temp==='/'||this.temp==='²'||this.temp==='+'){
      /*delete operator*/ 
      this.operator=''
      /*flag=false which means that */ 
      this.flag=false
      this.operand1=this.operand2
    }
    else if(this.operator===""){
      this.operand1=this.operand1.substring(0, this.operand1.length-1)
    }
    else{
      this.operand1=this.operand2.substring(0, this.operand1.length-1)
    }
  this.equation=this.equation.substring(0, this.equation.length-1)
  }
  displayres(y:string){
    if(this.operator===''&&this.operand2==='0'){
     this.add("+","0",this.operand1)
    }
    else{
    this.add(this.operator,this.operand2,this.operand1)
    }
    this.calculated=true
  }
  //inverse
  resin(y:string){
    if(this.calculated) this.equation=this.b
    else if(this.operand1==='0'&&this.calculated===false) this.equation='0'
    this.invert(this.equation) 
    this.calculated=true 
  }
  //squart
  root(y:string){
    if(this.calculated) this.equation=this.b
    else if(this.operand1==='0'&&this.calculated===false) this.equation='0'
    this.sqrt(this.equation) 
    this.calculated=true 
  }
   //percent
  pouu(y:string){
    if(this.operator===''&&this.operand2===''){
    this.operator=" "
    this.operand2="0"}
    this.percent(this.operator,this.operand2,this.operand1)
    this.calculated=true
  }
  //change sign
  plusminus(y:string){
    this.plus(this.equation) 
    this.calculated=true 
  }
}

