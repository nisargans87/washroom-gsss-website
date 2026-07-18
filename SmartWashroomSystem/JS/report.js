// ======================================
// CUSTOM TOAST NOTIFICATION
// ======================================

function showToast(message,type){
//console.log("Toast called:", message);
    const toast=document.getElementById("toast");
    const icon=document.getElementById("toastIcon");
    const text=document.getElementById("toastMessage");

    text.innerHTML=message;

    toast.className="toast-card show "+type;

    if(type==="success"){

        icon.className="bi bi-check-circle-fill";

    }
    else{

        icon.className="bi bi-exclamation-triangle-fill";

    }

    setTimeout(function(){

        toast.classList.remove("show");

    },3000);

}




// =====================================
// WASHROOM ROOM DATA
// =====================================


const washroomRooms = {


    girls: [

        "Girls Washroom - Room 1",
        "Girls Washroom - Room 2",
        "Girls Washroom - Room 3",
        "Girls Washroom - Room 4",
        "Girls Washroom - Room 5"

    ],


    boys: [

        "Boys Washroom - Room 1",
        "Boys Washroom - Room 2",
        "Boys Washroom - Room 3"

    ]


};




// =====================================
// DYNAMIC WASHROOM NUMBER DROPDOWN
// =====================================


document
.querySelectorAll('input[name="washroomType"]')
.forEach(function(radio){


    radio.addEventListener("change", function(){


        let roomDropdown =
        document.getElementById("roomNumber");



        roomDropdown.innerHTML = `

        <option selected disabled>

        Select Washroom Number

        </option>

        `;



        let selectedType = this.value;



        washroomRooms[selectedType]
        .forEach(function(room){


            let option =
            document.createElement("option");



            option.value = room;


            option.textContent = room;



            roomDropdown.appendChild(option);



        });


    });


});




// =====================================
// AUTO CURRENT TIME (MYSQL FORMAT)
// =====================================


function setCurrentTime(){


    let now = new Date();



    let mysqlTime =

    now.getFullYear() + "-" +

    String(now.getMonth()+1).padStart(2,'0') + "-" +

    String(now.getDate()).padStart(2,'0') + " " +

    String(now.getHours()).padStart(2,'0') + ":" +

    String(now.getMinutes()).padStart(2,'0') + ":" +

    String(now.getSeconds()).padStart(2,'0');



    document
    .getElementById("currentTime")
    .value = mysqlTime;


}



// Set time when page opens

setCurrentTime();


// Update time every second

setInterval(setCurrentTime,1000);
// =====================================
// SHOW TEXTBOX WHEN "OTHER" IS SELECTED
// =====================================

document
.getElementById("issueCategory")
.addEventListener("change", function(){

    const otherIssueBox =
    document.getElementById("otherIssueBox");

    if(this.value === "Other"){

        otherIssueBox.style.display = "block";

    }
    else{

        otherIssueBox.style.display = "none";

        document.getElementById("description").value = "";

    }

});

document
.getElementById("complaintForm")
.addEventListener("submit", function(event){

    event.preventDefault();

    let selectedWashroom =
    document.querySelector(
        'input[name="washroomType"]:checked'
    );

    if(!selectedWashroom){

        showToast(
            "Please select the washroom type.",
            "error"
        );

        return;
    }

    if(document.getElementById("roomNumber").selectedIndex==0){

        showToast(
            "Please select the washroom number.",
            "error"
        );

        return;
    }

    if(document.getElementById("issueCategory").selectedIndex==0){

        showToast(
            "Please select the issue category.",
            "error"
        );

        return;
    }

    let complaintData={

        washroom_type:selectedWashroom.value,

        washroom_number:
        document.getElementById("roomNumber").value,

        issue_category:
        document.getElementById("issueCategory").value,

        description:
        document.getElementById("description").value,

        submitted_time:
        document.getElementById("currentTime").value

    };

    fetch("http://localhost:5000/submitComplaint",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(complaintData)

    })

    .then(async(response)=>{

        const message=await response.text();

        if(!response.ok){

            throw new Error(message);

        }

        return message;

    })

    .then(result=>{

        showToast(
            "Complaint submitted successfully.",
            "success"
        );

        setTimeout(function(){

            window.location.href="sucess.html";

        },1000);

    })

    .catch(error=>{

        if(error.message.includes("20")){

            showToast(
                "A complaint for this washroom and issue already exists. Please wait 20 minutes before submitting again.",
                "error"
            );

        }
        else{

            showToast(
                error.message || "Unable to connect to the server.",
                "error"
            );

        }

        console.log(error);

    });

});



