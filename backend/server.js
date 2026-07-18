const express = require("express");
const cors = require("cors");
const db = require("./db");


const app = express();


app.use(cors());

app.use(express.json());



// =====================================
// SUBMIT COMPLAINT API
// =====================================


app.post("/submitComplaint",(req,res)=>{


    const complaint = req.body;



    console.log("Incoming Complaint:");
    console.log(complaint);



    // CHECK SAME COMPLAINT WITHIN 20 MINUTES


    const checkQuery = `

    SELECT *

    FROM complaints

    WHERE washroom_number = ?

    AND issue_category = ?

    AND submitted_time >= NOW() - INTERVAL 20 MINUTE

    `;



    db.query(

        checkQuery,

        [

            complaint.washroom_number,

            complaint.issue_category

        ],


        (error,result)=>{


            if(error){


                console.log(error);


                return res
                .status(500)
                .send(
                "Database checking failed"
                );


            }




            console.log("Duplicate Check Result:");

            console.log(result);





            if(result.length > 0){


                return res

                .status(400)

                .send(
                "Same complaint already submitted. Please wait 20 minutes."
                );


            }





            // INSERT NEW COMPLAINT


            const insertQuery = `

            INSERT INTO complaints

            (

            washroom_type,

            washroom_number,

            issue_category,

            description,

            submitted_time,

            status

            )


            VALUES

            (?,?,?,?,NOW(),'Pending')


            `;




            db.query(

                insertQuery,

                [

                complaint.washroom_type,

                complaint.washroom_number,

                complaint.issue_category,

                complaint.description


                ],


                (error,result)=>{


                    if(error){


                        console.log(error);


                        return res

                        .status(500)

                        .send(
                        "Complaint submission failed"
                        );


                    }




                    res.send(
                    "Complaint submitted successfully"
                    );


                }


            );



        }


    );



});
// ======================================
// CLEANER LOGIN API
// ======================================

app.post("/cleanerLogin",(req,res)=>{

    const employeeId=req.body.employee_id;

    const password=req.body.password;

    const sql=`

    SELECT *

    FROM cleaners

    WHERE employee_id=?

    AND password=?

    AND account_status='Active'

    `;

    db.query(

        sql,

        [

            employeeId,

            password

        ],

        (err,result)=>{

            if(err){

                console.log(err);

                return res.status(500).json({

                    message:"Database Error"

                });

            }

            if(result.length===0){

                return res.status(401).json({

                    message:"Invalid Employee ID or Password"

                });

            }

            res.json({

                message:"Login Successful",

                cleaner:{

                    id:result[0].id,

                    employee_id:result[0].employee_id,

                    full_name:result[0].full_name,

                    email:result[0].email,

                    mobile:result[0].mobile,

                    profile_photo:result[0].profile_photo

                }

            });

        }

    );

});
// ======================================
// CLEANER REGISTRATION
// ======================================

app.post("/registerCleaner",(req,res)=>{

    const cleaner=req.body;

    const checkSql=`

    SELECT *

    FROM cleaners

    WHERE employee_id=?

    OR email=?

    `;

    db.query(

        checkSql,

        [

            cleaner.employee_id,

            cleaner.email

        ],

        (err,result)=>{

            if(err){

                return res.status(500).json({

                    message:"Database Error"

                });

            }

            if(result.length>0){

                return res.status(400).json({

                    message:"Employee ID or Email already exists."

                });

            }

            const insertSql=`

            INSERT INTO cleaners

            (

            employee_id,

            full_name,

            email,

            mobile,

            password

            )

            VALUES(?,?,?,?,?)

            `;

            db.query(

                insertSql,

                [

                    cleaner.employee_id,

                    cleaner.full_name,

                    cleaner.email,

                    cleaner.mobile,

                    cleaner.password

                ],

                (error)=>{

                    if(error){

                        return res.status(500).json({

                            message:"Registration Failed"

                        });

                    }

                    res.json({

                        message:"Cleaner Registered Successfully"

                    });

                }

            );

        }

    );

});

// ======================================
// GET ALL PENDING COMPLAINTS
// ======================================

app.get("/getComplaints",(req,res)=>{

    const sql=`

    SELECT *

    FROM complaints

    WHERE status IN('Pending','In Progress')

    ORDER BY submitted_time DESC

    `;

    db.query(sql,(err,result)=>{

        if(err){

            console.log(err);

            return res.status(500).json({

                message:"Database Error"

            });

        }

        res.json(result);

    });

});
// ======================================
// GET SINGLE COMPLAINT
// ======================================
app.get("/getComplaints", (req, res) => {

    const sql = `

    SELECT *

    FROM complaints

    ORDER BY submitted_time DESC

    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.json(result);

    });

});

// =====================================
// RESOLVE COMPLAINT
// =====================================
// =====================================
// RESOLVE COMPLAINT
// =====================================

app.put("/resolveComplaint/:id",(req,res)=>{

    const complaintId = req.params.id;


    const sql = `

    UPDATE complaints

    SET

    status='Resolved',

    resolved_by='CLN001',

    resolved_time=NOW()

    WHERE id=?

    `;


    db.query(

        sql,

        [complaintId],

        (err,result)=>{

            if(err){

                console.log(err);

                return res.status(500).send(
                    "Unable to update complaint."
                );

            }


            res.send(
                "Complaint resolved successfully."
            );

        }

    );

});




// =====================================
// ACCEPT COMPLAINT
// =====================================

app.put("/acceptComplaint/:id", (req, res) => {

    const id = req.params.id;

    const sql = `

    UPDATE complaints

    SET

    status='In Progress',

    accepted_by='CLN001'

    WHERE id=?

    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Database Error");
        }

        if (result.affectedRows == 0) {
            return res.status(404).send("Complaint Not Found");
        }

        res.status(200).json({
            success: true,
            message: "Complaint Accepted"
        });

    });

});




// =====================================
// SERVER START
// =====================================

app.listen(5000,()=>{


    console.log(
        "Server running on port 5000"
    );


});