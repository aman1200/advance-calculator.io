
let rawData = document.querySelectorAll('.btn');
let inputData = Array.from(rawData);             // Converting a nodelist to an Array
let calc = document.querySelector('#Calc');
let out = document.querySelector('#output');
let input=""; // for storing the input as a string
let keyArr =[];
let key = 0;
let preValue = 0;

const numOperator = ['0','1','2','3','4','5','6','7','8','9','.','+','-','/','*','(',')'];
const mathAdvance = ['sin','cos','tan','arcsin','arccos','arctan','sqrt','log','ln','x^y','e^x','1/x','x!'];


const mathObj = new Map();
mathObj.set(0,"Math.sin");
mathObj.set(1,"Math.cos");
mathObj.set(2,"Math.tan");
mathObj.set(3,"Math.asin");
mathObj.set(4,"Math.acos");
mathObj.set(5,"Math.atan");
mathObj.set(6,"Math.sqrt");
mathObj.set(7,"Math.log");     //To be Converted to Base 10
mathObj.set(8,"Math.log");    // Built in JavaScript Conversion for Base e
mathObj.set(9,"Math.pow");
mathObj.set(10,"Math.exp");

//Adding two other operartions
mathObj.set(11,reciprocal);
mathObj.set(12,factorialize);


/******************************************************/
//Function for factorial and reciprocal of a number

function factorialize(num) {
  if (num === 0 || num === 1)
    return 1;
  for (let i = num - 1; i >= 1; i--) {
    num *= i;
  }
  return num;
}


function reciprocal(num){
  return 1/num;
}

/******************************************************/

for (let i =0;i<inputData.length;i++){
  inputData[i].addEventListener('click',function(){
    if (this.textContent === "="){
        calc.textContent+=this.textContent;
        out.textContent = evaluteValues(input);
    }else if(this.textContent === "C"){
        resetAll();
    }
    else{
      calc.textContent+=this.textContent;
      input+=this.textContent;
      keyArr.push(this.textContent);
      if (mathAdvance.includes(this.textContent)){
        key = 1;
      }
    }

  });
}


function evaluteValues(inputString){
  if (key === 0){
    return eval(inputString);
  }else{
    let p = advCalculation();
    return p;
  }

}


function advCalculation(){
    let outputString="";
    for (let i=0;i<keyArr.length;i++){
      if (mathAdvance.includes(keyArr[i])){
        let k = mathAdvance.indexOf(keyArr[i]);
         outputString+=mathObj.get(k);
      }else{
        outputString+=keyArr[i];
      }
    }
    return eval(outputString);

  }

  function resetAll(){
    input="";
    keyArr =[];
    key = 0;

    calc.innerHTML="<span>&nbsp;</span>";
    out.innerHTML="<span>&nbsp;</span>";
  }
