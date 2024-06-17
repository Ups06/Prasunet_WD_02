let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0;
let running = false;
let currentTime;
let lapCounter = 1;

const timeDisplay = document.getElementById("timeDisplay");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - savedTime;
        tInterval = setInterval(updateTime, 1);
        startStopBtn.textContent = "Pause";
        running = true;
    } else {
        clearInterval(tInterval);
        savedTime = new Date().getTime() - startTime;
        startStopBtn.textContent = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    startStopBtn.textContent = "Start";
    timeDisplay.textContent = "00:00:00";
    laps.innerHTML = '';
    lapCounter = 1;
}

function lap() {
    if (running) {
        const lapTime = document.createElement("div");
        lapTime.classList.add("lap");
        lapTime.textContent = `Lap ${lapCounter}: ${timeDisplay.textContent}`;
        laps.appendChild(lapTime);
        lapCounter++;
    }
}

function updateTime() {
    currentTime = new Date().getTime();
    difference = currentTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}
// function scrollToStopwatch() {
//     document.getElementById('stopwatchSection').scrollIntoView({ behavior: 'smooth' });
// }