// Spread the content of the NodeList from the queryselector into an array
const buttons = [...document.querySelectorAll('.timer__button')];
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
let secs, countdown;  

function timer(seconds){
    // clear existing timers
    clearInterval(countdown);
    
    // Get current time in ms
    const now = Date.now();
    // then in ms
    const then = now + (seconds * 1000);
    displaySecondsLeft(seconds); 
    displayEndTime(then);

    // get seconds left to completion i.e for now to get to then 
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft <= 0 ){
            clearInterval(countdown);
            return;
        }
        displaySecondsLeft(secondsLeft);
    }, 1000);
};

function displaySecondsLeft(seconds) {
    // Take the whole number when seconds is divided by 60
    const minutes = Math.floor(seconds / 60);
    // let seconds be the remainder when seconds is divided by 60
    const remainderSeconds = seconds % 60;
    // display time
    const display = `${minutes}:${remainderSeconds < 10? `0${remainderSeconds}`: remainderSeconds}`;
    timerDisplay.textContent = display;
    // show the time on the title of the tap
    document.title = display;
};

function displayEndTime(timestamp){
    // The timestamp is our then variable
    const now = new Date(timestamp);
    const hour = now.getHours();
    const minute = now.getMinutes();
    // DISPLAY END TIME
    endTime.textContent = `Back at ${hour > 12? hour - 12: hour}:${minute < 10? '0':''}${minute}`;
};

function startTimer(){
    // console.dir(this);
    if (this.localName == 'button'){
        secs = parseInt(this.dataset.time);
    } else {
        secs = document.customForm.children[0].value * 60;
    }
    
    timer(secs);
}

buttons.forEach(button => {
    button.addEventListener('click', startTimer);
});

document.customForm.addEventListener('submit', (e) => {
    e.preventDefault();
    startTimer();
});