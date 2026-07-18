const container=document.getElementById("complaintContainer");

fetch("http://localhost:5000/getComplaints")

.then(response=>response.json())

.then(complaints=>{

    if(complaints.length===0){

        container.innerHTML=`

        <div class="alert alert-success">

        No pending complaints.

        </div>

        `;

        return;

    }

    complaints.forEach(function(c){

        container.innerHTML+=`

        <div class="card complaint-card">

            <div class="card-body">

                <h5>

                ${c.washroom_number}

                </h5>

                <p>

                <b>Issue :</b>

                ${c.issue_category}

                </p>

                <p>

                <b>Submitted :</b>

                ${formatDateTime(c.submitted_time)}

                </p>

                <p class="status pending">

                ${c.status}

                </p>

                <button

                class="btn btn-success view-btn"

                onclick="viewComplaint(${c.id})">

                View Complaint

                </button>

            </div>

        </div>

        `;

    });

})

.catch(error=>{

    console.log(error);

});
function viewComplaint(id){

    window.location.href=

    "complaint.html?id="+id;

}
function formatDateTime(dateTime){

    const d = new Date(dateTime);

    const date = d.toLocaleDateString("en-IN",{

        day:"2-digit",

        month:"short",

        year:"numeric"

    });

    const time = d.toLocaleTimeString("en-IN",{

        hour:"2-digit",

        minute:"2-digit",

        second:"2-digit",

        hour12:true

    });

    return date + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + time;

}