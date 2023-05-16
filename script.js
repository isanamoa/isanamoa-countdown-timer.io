
// Lines of code refresh the time on each count down
const dateFunc = (second) => {
    let timerCount = second * 1000;
    const startTime = new Date(timerCount) 
    const startHour = startTime.getHours(),
    startMin = startTime.getMinutes() < 10 ? `0${startTime.getMinutes().toLocaleString()}`: startTime.getMinutes().toLocaleString(),
    startSec = startTime.getSeconds() < 10 ? `0${startTime.getSeconds().toLocaleString()}`: startTime.getSeconds().toLocaleString();  
    const display__time_left = document.querySelector('.display__time-left'); 
    display__time_left.textContent = startHour >= 1 ? `${startHour * 60 + startTime.getMinutes()}:${startSec}` : `${startMin}:${startSec}`;

}

/*
    The lines of code indicate on the screen the time Countdown Time
    is expected to stop.
*/
const timerEndFunc = (second) => {
    let timeInSeconds = Date.now();
    timeInSeconds += (second * 1000) 
    const endTime = new Date(timeInSeconds) 
    const hour = endTime.getHours().toLocaleString() <= 12 ? endTime.getHours().toLocaleString() : endTime.getHours().toLocaleString() - 12;
    const minutes =  endTime.getMinutes().toLocaleString() < 10 ? `0${endTime.getMinutes().toLocaleString()}` : endTime.getMinutes().toLocaleString();
    
    const display__end_time = document.querySelector('.display__end-time'); 
    display__end_time.textContent = endTime.getHours().toLocaleString() < 12 ? `Be Back At ${hour}:${minutes} AM`: `Be Back At ${hour}:${minutes} PM`;
}

// Lines of code is the count down timer function call on button click
let resetInterval;
const timerFunction = (second)=>{
    //Clears the timer on initial click
    clearInterval(resetInterval);

    // The dateFunc is called to set the timer screen
    dateFunc(second);

    /*
        Timer begins within an interval as the second counts down
        The dateFunc is called after each count down to refresh timer screen
    */
    resetInterval = setInterval(() => { 
        dateFunc(second);
        if (second <= 0){ 
            clearInterval(resetInterval)
        }
        second--;
    }, 1000);

    // The function is called inside the timerfunc to display expected end time
    timerEndFunc(second)
}

/* 
    The lines of code access all buttons that have same class name and
    It the loops through the buttons and display results base on each button's click
*/   
const timer__button = document.querySelectorAll('.timer__button');
timer__button.forEach(button => {
    button.addEventListener('click', 
    ()=>timerFunction(button.getAttribute('data-time'))
    );
}); 

/*
    The lines of code access a button with its attribute name and
    then listens to onclick event of the button the display 
    minutes entered by user
*/ 
const submit__button = document.querySelector('[name=submitCustomForm]');
submit__button.addEventListener('click', (e)=>{
    e.preventDefault();
    let inptVal = document.querySelector('[name=minutes]');
    let timerMinInSec = inptVal.value <= 0 ? 0 :  inptVal.value * 60;
    timerFunction(timerMinInSec)
}); 

