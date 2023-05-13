
// Lines of code refresh the time on each count down
const dateFunc = (second) => {
    let timerCount = second * 1000;
    const startTime = new Date(timerCount) 
    let startHour = startTime.getHours().toLocaleString(),
    startMin = startTime.getMinutes().toLocaleString() < 10 ? `0${startTime.getMinutes().toLocaleString()}`: startTime.getMinutes().toLocaleString(),
    startSec = startTime.getSeconds().toLocaleString() < 10 ? `0${startTime.getSeconds().toLocaleString()}`: startTime.getSeconds().toLocaleString();
    
    //console.log(startTime.getMinutes().toLocaleString())
    //console.log(startTime.getSeconds().toLocaleString())
    //console.log(startHour)
    
    let startHourOut = startHour < 10 ? `0${startHour}`: startHour;
    const display__time_left = document.querySelector('.display__time-left'); 
    display__time_left.textContent = startHour <= 0 ? `${startMin}:${startSec}` : `${startHourOut}:${startMin}:${startSec}`;

    if (startHour === '1' && startMin >= 1){
        display__time_left.textContent = `${startHourOut}:${startMin}:${startSec}`;
    }
    if (startHour === '1' && startMin < 1) {
        display__time_left.textContent = `${startHour * 60}:${startSec}`;
    }
    

}

/*
    The lines of code indicate on the screen the time Countdown Time
    is expected to stop.
*/
const timerEndFunc = (second) => {
    let timeInSeconds = Date.now();
    //console.log(timeInSeconds)
    timeInSeconds += (second * 1000);  
    //console.log(timeInSeconds) 
    const endTime = new Date(timeInSeconds) 
    //console.log(endTime.getHours().toLocaleString()-12)
    const hour = endTime.getHours().toLocaleString() <= 12 ? endTime.getHours().toLocaleString() : endTime.getHours().toLocaleString() - 12,
        minutes =  endTime.getMinutes().toLocaleString() < 10 ? `0${endTime.getMinutes().toLocaleString()}` : endTime.getMinutes().toLocaleString();
    //console.log(endTime.getMinutes().toLocaleString());
    
    const display__end_time = document.querySelector('.display__end-time'); 
    display__end_time.textContent = endTime.getHours().toLocaleString() < 12 ? `Be Back At ${hour}:${minutes} AM`: `Be Back At ${hour}:${minutes} PM`;
}

// Lines of code is the count down timer function call on button click
let level;
const timerFunction = (second)=>{
    //Clears the timer on initial click
    clearInterval(level);

    // The dateFunc is called to set the timer screen
    dateFunc(second);

    /*
        Timer begins within an interval as the second counts down
        The dateFunc is called after each count down to refresh timer screen
    */
    level = setInterval(() => {
        second--;
        dateFunc(second);
        
        if (second <= 0){ 
            clearInterval(level)
        }

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
    //console.log(inptVal.value);
    const timerMinInSec = inptVal.value * 60;
    timerFunction(timerMinInSec);

}); 

