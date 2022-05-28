let datePara = document.querySelector("#currentDay");
let container = document.querySelector(".container");

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

fillBlocks();

container.addEventListener("click",function(event){
    let element =event.target;
    
})


//Constantly check time (But only display date)
let timeInterval = setInterval(function () {
    datePara.textContent=moment().format("MMM, Do YYYY");
}, 1000);