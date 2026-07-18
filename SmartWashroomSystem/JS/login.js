// =====================================
// CLEANER LOGIN
// =====================================

document
.getElementById("loginForm")
.addEventListener("submit", function(event){

    event.preventDefault();

    const employeeId =
    document.getElementById("employeeId")
    .value
    .trim();

    const password =
    document.getElementById("password")
    .value
    .trim();

    if(employeeId===""){

        alert("Please enter Employee ID");

        return;

    }

    if(password===""){

        alert("Please enter Password");

        return;

    }

    const loginData={

        employee_id:employeeId,

        password:password

    };

    fetch("http://localhost:5000/cleanerLogin",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(loginData)

    })

    .then(async(response)=>{

        const result=await response.json();

        if(!response.ok){

            throw new Error(result.message);

        }

        return result;

    })

    .then(data=>{

        localStorage.setItem(
            "cleaner",
            JSON.stringify(data.cleaner)
        );

        window.location.href="dashboard.html";

    })

    .catch(error=>{

    const errorBox =
    document.getElementById("loginError");

    errorBox.style.display="block";

    errorBox.innerHTML=error.message;

    console.log(error);

});
});