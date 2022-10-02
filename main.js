const currentTimeOutput = document.getElementById("time");
const registeredTime = document.getElementById("registered-time");
const btnStart = document.getElementById("start-time");
const btnResumeStop = document.getElementById("resume/stop-time");
const btnRestart = document.getElementById("restart-time");
const btnRegister = document.getElementById("register-time");
const registeredTimeList = document.querySelector(".registered-time");

let timeInterval,
   initialTime = 0,
   timeAccumlator = 0,
   clickController = 0,
   isRunning = false;

btnStart.addEventListener("click", () => {
   isRunning = true;
   clickController++;

   if (clickController < 2) {
      initialTime = new Date();
      timeInterval = setInterval(renderClock, 10);
   }
});

btnResumeStop.addEventListener("click", ({ target }) => {
   if (currentTimeOutput.innerHTML !== "00 : 00 : 00 : 00") {
      if (isRunning) {
         target.innerHTML = `Resume`;
         clearInterval(timeInterval);
         isRunning = false;
      } else {
         target.innerHTML = `Stop`;
         const currentTime = new Date();
         const resumeTime = currentTime - timeAccumlator;
         initialTime.setTime(resumeTime);
         timeInterval = setInterval(renderClock, 10);
         isRunning = true;
      }
   }
});

btnRestart.addEventListener("click", () => {
   initialTime = 0;
   timeAccumlator = 0;
   isRunning = false;
   clickController = 0;
   clearInterval(timeInterval);
   currentTimeOutput.innerHTML = "00 : 00 : 00 : 00";
   registeredTime.innerHTML = "";
   document.querySelector(".registered-time").classList.remove("active");
   btnResumeStop.innerHTML = ` Stop <i class="fas fa-square pl-2"></i>`;
});

btnRegister.addEventListener("click", () => {
   if (isRunning) {
      document.querySelector(".registered-time").classList.add("active");

      registeredTime.innerHTML += `
    <li class="list-group-item d-flex justify-content-between">
      <h3>${getTime()}</h3>
    </li>`;

      registeredTime.querySelectorAll("li").forEach((item) => {
         setTimeout(() => item.classList.add("spawn-animation"), 1);
      });
   }
});

const getTime = () => {
   const currentTime = new Date();
   const finalTimeAccuml = new Date();
   timeAccumlator = currentTime - initialTime;

   finalTimeAccuml.setTime(timeAccumlator);

   let miliseconds = Math.floor(finalTimeAccuml.getMilliseconds() / 10),
      seconds = finalTimeAccuml.getSeconds(),
      minutes = finalTimeAccuml.getMinutes(),
      hours = finalTimeAccuml.getHours() - 18;

   miliseconds = `0${miliseconds}`.slice(-2);
   seconds = `0${seconds}`.slice(-2);
   minutes = `0${minutes}`.slice(-2);
   hours = `0${hours}`.slice(-2);

   return `${hours} : ${minutes} : ${seconds} : ${miliseconds}`;
};

const renderClock = () => (currentTimeOutput.innerHTML = getTime());
