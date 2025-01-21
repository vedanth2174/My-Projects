//First giving function to all buttons
//clear button
document.querySelector('#clear').addEventListener('click', (e)=>{
    document.getElementById('task').textContent = ''
})


//Number buttons first
const input = document.querySelector('#task')

let operand1
let operand2

let operator = []

document.querySelector('#zero').addEventListener('click', (e)=>{
    input.textContent += e.target.textContent
})
document.querySelector('#one').addEventListener('click', (e)=>{
    input.textContent += e.target.textContent
})
document.querySelector('#two').addEventListener('click', (e)=>{
    input.textContent += e.target.textContent
})
document.querySelector('#three').addEventListener('click', (e)=>{
    input.textContent += e.target.textContent
})
document.querySelector('#four').addEventListener('click', (e)=>{
    input.textContent += e.target.textContent
})
document.querySelector('#five').addEventListener('click', (e)=>{
    input.textContent += e.target.textContent
})
document.querySelector('#six').addEventListener('click', (e)=>{
    input.textContent += e.target.textContent
})
document.querySelector('#seven').addEventListener('click', (e)=>{
    input.textContent += e.target.textContent
})
document.querySelector('#eight').addEventListener('click', (e)=>{
    input.textContent += e.target.textContent
})
document.querySelector('#nine').addEventListener('click', (e)=>{
    input.textContent += e.target.textContent
})

//Operators
document.querySelector('#add').addEventListener('click', (e)=>{
    operand1 = parseInt(document.querySelector('#task').textContent)
    operator.unshift(e.target.textContent)
    input.textContent = ""
})
document.querySelector('#multiply').addEventListener('click', (e)=>{
    operand1 = parseInt(document.querySelector('#task').textContent)
    operator.unshift(e.target.textContent)
    input.textContent = ""
})
document.querySelector('#divide').addEventListener('click', (e)=>{
    operand1 = parseInt(document.querySelector('#task').textContent)
    operator.unshift(e.target.textContent)
    input.textContent = ""
})
document.querySelector('#subtract').addEventListener('click', (e)=>{
    operand1 = parseInt(document.querySelector('#task').textContent)
    operator.unshift(e.target.textContent)
    input.textContent = ""
})
document.querySelector('#res').addEventListener('click', (e)=>{
    operand2 = parseInt(document.querySelector('#task').textContent)
    console.log(operator[0])
    if(operand1 = ""){
        input.textContent = ""
        operand1 = ""
        operand2 = ""
    }else{
        switch(operator[0]){
            case '+':
                res = operand1 + operand2;
                input.textContent = res
                operand1 = ""
                operand2 = ""

                break;
            case '-':
                res = operand1 - operand2;
                input.textContent = res
                operand1 = ""
                operand2 = ""
                break;
            case '×':
                res = operand1 * operand2;
                input.textContent = res
                operand1 = ""
                operand2 = ""
                break;
            case '÷':
                res = (operand1 / operand2).toPrecision(4);
                input.textContent = res
                operand1 = ""
                operand2 = ""
                break;
            default:
                res = ""
                input.textContent = res
                operand1 = ""
                operand2 = ""
                break;
            }
        }
})


