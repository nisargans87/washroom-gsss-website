function showToast(message,type){

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
const params = new URLSearchParams(window.location.search);

const complaintId = params.get("id");

fetch("http://localhost:5000/getComplaint/" + complaintId)

.then(response => response.json())

.then(c => {

document.getElementById("washroomNumber").innerHTML =
c.washroom_number;

document.getElementById("washroomType").innerHTML =
c.washroom_type;

document.getElementById("issueCategory").innerHTML =
c.issue_category;

document.getElementById("description").innerHTML =
c.description || "No Description";

const submittedDate = new Date(c.submitted_time);

const date = submittedDate.toLocaleDateString("en-GB");

const time = submittedDate.toLocaleTimeString("en-IN",{
    hour:"2-digit",
    minute:"2-digit",
    second:"2-digit",
    hour12:true
});

document.getElementById("submittedTime").innerHTML =
date + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + time;

document.getElementById("status").innerHTML =
c.status;
speakComplaint(c);



if(c.photo){

document.getElementById("photoContainer").innerHTML =

`
<img
src="../uploads/${c.photo}"
class="img-fluid rounded">
`;

}

});
function resolveComplaint(){

    fetch(

        "http://localhost:5000/resolveComplaint/"+complaintId,

        {

            method:"PUT"

        }

    )

    .then(response=>response.text())

    .then(message=>{

        showToast(

            "Complaint marked as resolved successfully.",

            "success"

        );

        setTimeout(function(){

            window.location.href="dashboard.html";

        },1500);

    })

    .catch(error=>{

        showToast(

            "Unable to update complaint.",

            "error"

        );

        console.log(error);

    });
}
function speakComplaint(c){

    const issueMap = {

        "Dirty Floor":"ನೆಲ ಅಶುಚಿಯಾಗಿದೆ",

        "No Water":"ನೀರು ಸರಬರಾಜು ಇಲ್ಲ",

        "Bad Smell":"ದುರ್ವಾಸನೆ ಉಂಟಾಗಿದೆ",

        "Flush Not Working":"ಫ್ಲಷ್ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿಲ್ಲ",

        "Water Leakage":"ನೀರು ಸೋರಿಕೆಯಾಗುತ್ತಿದೆ",

        "Dustbin Full":"ಕಸದ ಬುಟ್ಟಿ ತುಂಬಿದೆ",

        "No Electricity":"ವಿದ್ಯುತ್ ಲಭ್ಯವಿಲ್ಲ",

        "Other":"ಇತರೆ ಸಮಸ್ಯೆ ವರದಿಯಾಗಿದೆ"

    };

    const washroom =

        c.washroom_type === "girls"

        ? "ಮಹಿಳಾ ಶೌಚಾಲಯ"

        : "ಪುರುಷರ ಶೌಚಾಲಯ";

    const roomNumber = c.washroom_number.match(/\d+/)[0];

    const issue = issueMap[c.issue_category] || "ಸಮಸ್ಯೆ ವರದಿಯಾಗಿದೆ";

    const date = new Date(c.submitted_time);

    const months = [

        "ಜನವರಿ",

        "ಫೆಬ್ರವರಿ",

        "ಮಾರ್ಚ್",

        "ಏಪ್ರಿಲ್",

        "ಮೇ",

        "ಜೂನ್",

        "ಜುಲೈ",

        "ಆಗಸ್ಟ್",

        "ಸೆಪ್ಟೆಂಬರ್",

        "ಅಕ್ಟೋಬರ್",

        "ನವೆಂಬರ್",

        "ಡಿಸೆಂಬರ್"

    ];

    const day = date.getDate();

    const month = months[date.getMonth()];

    const year = date.getFullYear();

    const hour = date.getHours();

    const minute = date.getMinutes();

    const message =

    "ನಮಸ್ಕಾರ. " +

    "ಗಮನಿಸಿ. " +

    "ದಿನಾಂಕ " + day + " " + month + " " + year + ". " +

    "ಸಮಯ " + hour + " ಗಂಟೆ " + minute + " ನಿಮಿಷ. " +

    washroom + " " +

    "ರೂಮ್ ಸಂಖ್ಯೆ " + roomNumber + " ರಿಂದ " +

    issue + " ಎಂದು ವರದಿ ದಾಖಲಾಗಿದೆ. " +

    "ದಯವಿಟ್ಟು ಸಾಧ್ಯವಾದಷ್ಟು ಬೇಗ ಪರಿಶೀಲಿಸಿ. " +

    "ಧನ್ಯವಾದಗಳು.";

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(message);

    speech.lang = "kn-IN";

    speech.rate = 0.65;

    speech.pitch = 1.0;

    speech.volume = 1;

    window.speechSynthesis.speak(speech);

}