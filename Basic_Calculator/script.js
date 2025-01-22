//First giving function to all buttons
//clear button
let result  = new String()

document.querySelector('#clear').addEventListener('click', (e)=>{
    document.getElementById('task').textContent = ''
    result = ""
})

//Number buttons second
const input = document.querySelector('#task')

let operand1_pre
let operand1
let operand2

let operator = []

let numbers = document.getElementsByClassName('button_number');

let button_array = Array.from(numbers)

console.log(button_array)
button_array.forEach((button)=>{
    button.addEventListener('click', (e)=>{
        input.textContent += e.target.textContent
    })
})

//Operators

let symbol = document.getElementsByClassName('button_operator');

let operator_array = Array.from(symbol)

operator_array.forEach((button)=>{
    button.addEventListener('click', (e)=>{
        let op = document.querySelector('#task').innerHTML
        console.log(typeof cop)
        if(op == "×" ){
            result += "*"
            console.log('hii')
        }else if(op === "÷" ){
            result += "/"
            console.log('no hii')
        }
        else{
            result += document.querySelector('#task').innerHTML
        }
        result += e.target.innerHTML
        console.log(result)
        input.textContent = ""
    })
})

document.querySelector('#res').addEventListener('click', (e)=>{
    result += document.querySelector('#task').innerHTML
    console.log(result)
    input.textContent = eval(result)
    result = "  "
    result = eval(result)
})

let stri = new String()
stri +='82'
stri +='*'
stri +='8'
console.log(stri)
console.log(eval(stri))


