const client = require('../config/db.config').user;


exports.postAuth = async(req, res)=>{
    if(!req.params){
        res.status(400).send("Request cant be empty!")
    }else{
        
        const loginUsername = req.body.username
        console.log(loginUsername)

        let validEmail = false

        client.query('SELECT * FROM "USERS" WHERE "EMAIL"=$1', [loginUsername],
        (error, results)=>{
            if(error){
                res.status(500).send(error);
            }else{
                if(results.rowCount === 0){
                    res.status(201).send("No email")
                }
                else{
                    res.status(200).send(results.rows)
                }
            }
        })
            
        }
    
}