const express = require("express");
const router = express.Router();

const db = require("../db");


// GET all complaints
router.get("/complaints", (req, res) => {

    const sql = `
        SELECT 
            id,
            washroom,
            issue,
            status,
            submitted_time
        FROM complaints
        ORDER BY id DESC
    `;


    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json({
                error: err
            });

        }


        res.json(result);

    });

});



// UPDATE complaint status
router.put("/complaints/:id/status", (req, res) => {

    const id = req.params.id;

    const { status } = req.body;


    const sql =
        "UPDATE complaints SET status=? WHERE id=?";


    db.query(
        sql,
        [status, id],
        (err, result) => {


            if (err) {

                return res.status(500).json({
                    error: err
                });

            }


            res.json({

                message:
                "Status updated successfully"

            });


        }
    );

});


module.exports = router;