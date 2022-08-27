let inputStr = document.getElementsByClassName('button').value;
let canBeDecimal = true;
let number = "0";

function clear(){
    inputStr = "";
    num = "";
    document.calc.display.value = "";
}

function onClick(value){
    let lastCharacter;

    inputStr = inputStr.toString();
    lastCharacter = inputStr.slice(-1);

    if(value == 'C'){
        clear();
        return;
    }else if(value == '⌫'){
        inputStr = inputStr.slice(0, -1);
        num = num.slice(0, -1);
        displayNumbers(inputStr, value);
        return;
    }

    if((isNumber(lastCharacter) || isNumber(value)) && value !='='){
        if(number.includes(','))
            canBeDecimal = false;
    
        if(!canBeDecimal && value == ',')
            return;

        number += value;

        if(!isNumber(value) && value != ','){
            number = "0";
            canBeDecimal = true;
        }

        inputStr += value;
    }
    
    if(value == '='){
        inputStr = inputStr.replaceAll(",",".");
        inputStr = eval(inputStr).toString();
        inputStr = inputStr.replaceAll(".",",");
        number = inputStr;
        canBeDecimal = true;
    }

    displayNumbers(inputStr);
}

function isNumber(x){
    if(parseInt(x) >= 0 && parseInt(x) <= 9)
        return true;
    
    return false;
}

function displayNumbers(input){
    let displayNum = input.toString();

    displayNum = displayNum.replace("/", "÷");
    document.calc.display.value = displayNum;
}
