// =====================================
// CLEANER REGISTRATION
// =====================================
// ======================================
// CUSTOM TOAST NOTIFICATION
// ======================================

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
document
.getElementById("registerForm")
.addEventListener("submit",function(event){

    event.preventDefault();

    const employeeId =
    document.getElementById("employeeId").value.trim();

    const fullName =
    document.getElementById("fullName").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const mobile =
    document.getElementById("mobile").value.trim();

    const password =
    document.getElementById("password").value.trim();

    const registerError =
    document.getElementById("registerError");

    registerError.style.display="none";

    const cleanerData={

        employee_id:employeeId,

        full_name:fullName,

        email:email,

        mobile:mobile,

        password:password

    };

    fetch("http://localhost:5000/registerCleaner",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(cleanerData)

    })

    .then(async(response)=>{

        const result=await response.json();

        if(!response.ok){

            throw new Error(result.message);

        }

        return result;

    })

    .then(data=>{

    showToast(
        "Cleaner registered successfully.",
        "success"
    );

    setTimeout(function(){

        window.location.href="login.html";

    },1500);

})

 .catch(error=>{

    showToast(
        error.message,
        "error"
    );

}); 

});