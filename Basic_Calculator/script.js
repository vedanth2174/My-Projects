//First giving function to all buttons
//Number buttons first
const input = document.querySelector('#task')
document.querySelector('#zero').addEventListener('click', (e)=>{
    const number = document.querySelector('.button').innerHTML
    switch(number){
        case 1:
            input.textContent += 1;
            break;
        case 2: 
            input.textContent += 2;
            break;
    }
})