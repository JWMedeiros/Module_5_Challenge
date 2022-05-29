let datePara = document.querySelector("#currentDay");
let container = document.querySelector(".container");
let bodies=document.querySelectorAll(".text-body");
let btns = document.querySelectorAll(".btn");

let DaySchedule = {
    "currDay":"",
    "times":["","","","","","","","",""]
}

function openApp(){
    fillBlocks();
    datePara.textContent=moment().format("MMM, Do YYYY");
    let saved = JSON.parse(localStorage.getItem("schedule"));
    
    //Add to local if DNE
    if (!saved){
        localStorage.setItem("schedule", JSON.stringify(DaySchedule));
    }
    //if current saved date= todays date, populate bodies
    else if (saved.currDay===datePara.textContent){
        for (let i=0;i<bodies.length;i++){
            bodies[i].textContent=saved.times[i];
        }
    }
    //Otherwise set to new day and wipe schedule
    else{
        DaySchedule.currDay=datePara.textContent;
        for (let i=0; i<DaySchedule.times.length; i++){
            DaySchedule.times[i]="";
        }
        localStorage.setItem("schedule", JSON.stringify(DaySchedule));
    }
}

function saveCalendar(){
    DaySchedule.currDay=moment().format("MMM, Do YYYY");
    for (let i=0; i<DaySchedule.times.length; i++){
        DaySchedule.times[i]=bodies[i].textContent;
    }
    localStorage.setItem("schedule", JSON.stringify(DaySchedule));
}

for (let i=0;i<btns.length;i++){
    btns[i].addEventListener("click",saveCalendar)
}

function fillBlocks(){
    for (let i=0; i<9; i++){
        //Grab time-body Text
        let timeBlock = container.children[i].querySelector(".time-body").textContent;
        //Split String to number, AM/PM
        let amPM = timeBlock.split(" ");
        //Set TimeBlock to strict number
        timeBlock=parseInt(timeBlock);

        //Account for PM
        if (amPM[0]!=="12"&&amPM[1]==="PM"){
            timeBlock+=12;
        }

        let currentTime=parseInt(moment().format("H HH"));

        console.log(timeBlock);
        console.log(Math.floor(currentTime));

        if (timeBlock<Math.floor(currentTime)){
            container.children[i].children[1].style.backgroundColor="grey";
        }
        else if (timeBlock===Math.floor(currentTime)){
            container.children[i].children[1].style.backgroundColor="red";
        }
        else{
            container.children[i].children[1].style.backgroundColor="green";
        }
    }
}

for (let i=0; i<bodies.length;i++){
    bodies[i].addEventListener("click",function(event){
        let element=event.target;
        if (element.style.backgroundColor==="grey"){
            alert("You can't add events to past times!");
        }
        else {
            element.textContent=prompt("Add your event");
        }
    })
}

openApp();