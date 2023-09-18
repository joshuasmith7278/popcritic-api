const client = require('../config/db.config').user;
const dbUsers = require('../models/users.model');
const Users = dbUsers.Users;

exports.getAllUsers = async (req, res) => {
    
    client.query('SELECT * FROM "USERS"', 
    (error, results) => {
        if(error){
            res.status(500).send(error);
            console.log("500 SQL Server Error");
        }else{
            const users = [];
            for(let i = 0; i < results.rowCount; i++){
                
                users.push(results.rows[i].NAME);
            }

            res.status(201).send(users);
            console.log("201 All Users Found!");

        }
    });
}

exports.findOneUser = async (req, res) => {
    const params = req.params;
    
    client.query('SELECT * FROM "USERS" WHERE "USER_ID"=$1', [params.id],
    (error, results)=>{
        if(error){
            res.status(500).send(error);
            console.log("500 SQL Server error");
        }else{
            if(results.rowCount === 0){
                res.status(501).send("No User Found");
                console.log("501 No User Found");
            }
            else{
                res.status(202).send(results.rows);
                console.log("202 Found User!");

            }
            
        }
    });
  
}


//Call this function to create USER entry in DB
exports.createUser = async (req, res) => {
    if(!req.body){
        
        res.status(400).send({message:"Content cant be empty"});
        console.log("400 Request Body Empty");
    
    }
    else{
         //Insert register form from FRONTEND here !!!!!!!!!!!!!!!!!!!!!!!!!!
        const formData = req.body;
    
        client.query('INSERT INTO "USERS"("EMAIL","AUTHENTICITY","NAME","JOIN_DATE","USER_ID","PIC") VALUES($1, $2, $3, NOW(), nextval($4), $5)',
        [formData.EMAIL, formData.AUTHENTICITY, formData.NAME, 'user_id', formData.PIC], 
        (error, results)=>{
            if(error){
                res.status(500).send(error);
                console.log(error);
            }else{
                client.query('SELECT * FROM "USERS"', [], 
                (error, results)=>{
                    if(error){
                        res.status(501).send(error);
                        console.log("501 Create User");
                    }else{
                        const newUserList = results.rows;
                        res.status(200).send(newUserList);
                        console.log("200 User Created!");
                    }
                })
            }
        })

    }
};

exports.updateUser = (req, res) => {
    const params = req.params.id;
    const body = req.body;

    client.query('UPDATE "USERS" SET "EMAIL"=$1 WHERE "USER_ID"=$2', [body.EMAIL , params], 
    (error, results)=>{
        if(error){
            res.status(500).send(error);
            console.log(error);
        }else{
            client.query('SELECT * FROM "USERS" WHERE "USER_ID"=$1', [params],
            (error, results)=>{
                if(error){
                    res.status(501).send(error);
                    console.log("501 Update User")
                }else{
                    const updatedUserList = results;
                    res.status(200).send(updatedUserList.rows);
                    console.log("200 Updated User Successfully!");
                }
            })
        }

    })

    
}

exports.deleteUser = (req, res) => {
    const params = req.params;
    
    client.query('DELETE FROM "USERS" WHERE "USER_ID"=$1', [params.id],
    (error, results)=>{
        if(error){
            res.status(500).send(error);
            console.log("500 SQL Server Error");
        }else{
            client.query('SELECT * FROM "USERS"', [params.id], 
            (error, results)=>{
                if(error){
                    res.status(500).send(error);
                }else{
                    const updatedUserList = results;
                    res.status(200).send(updatedUserList);
                }
            })
        }
    })

}

exports.updateMovie = (req, res) =>{
    
}


 


