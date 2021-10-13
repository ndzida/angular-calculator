import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  currentNumber = '0';
  firstOperand = null;
  operator = null;
  waitForSecondNumber = false;

  constructor() { }

  ngOnInit(): void {
  }

  public getNumber(v: string){
    console.log(v);
    if(this.waitForSecondNumber)
    {
      this.currentNumber = v;
      this.waitForSecondNumber = false;
    }else{
      this.currentNumber === '0'? this.currentNumber = v: this.currentNumber += v;
    }
  }

  getDecimal(){
    if(this.waitForSecondNumber){
      this.currentNumber = '0.';
      this.waitForSecondNumber = false;
    }
    else if(!this.currentNumber.includes('.')){
        this.currentNumber += '.'; 
    }
  }

  private doCalculation(op: string , secondOp: number){
    switch (op){
      case '+':
        return this.firstOperand += secondOp; 
      case '-': 
        return this.firstOperand -= secondOp; 
      case '*': 
        return this.firstOperand *= secondOp; 
      case '/': 
        return this.firstOperand /= secondOp; 
      case '=':
        return secondOp;
      case 'x^2':
        return secondOp*secondOp;
      case 'sqrt(x)':
        return Math.sqrt(secondOp);
      case '1/x':
        return 1/secondOp;
    }
  }

  public getOperation(op: string){
    console.log(op);

    if(this.firstOperand === null){
      this.firstOperand = Number(this.currentNumber);

    }else if(this.operator){
      const result = this.doCalculation(this.operator , Number(this.currentNumber))
      this.currentNumber = String(result);
      this.firstOperand = result;
    }
    this.operator = op;
    this.waitForSecondNumber = true;

    console.log(this.firstOperand);

  }

  public getSingleOp(op: string){
    console.log(op);
    this.currentNumber = String(this.doCalculation(op, Number(this.currentNumber)))
  }

  public clear(){
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }
}
