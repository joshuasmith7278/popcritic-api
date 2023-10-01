const client = require('../config/db.config').user;

exports.getAllUsers = async (req, res) => {
    
    client.query('SELECT * FROM "USERS"', 
    (error, results) => {
        if(error){
            res.status(500).send(error);
        }else{

            if(results.rowCount === 0){
                res.status(204).send("No users in DB")
            }
            else{
                const users = [];
                for(let i = 0; i < results.rowCount; i++){
                    
                    users.push(results.rows[i].NAME);
                }

                res.status(200).send(users);
            }

        }
    });
}

exports.findOneUser = async (req, res) => {
    const params = req.params;
    
    client.query('SELECT * FROM "USERS" WHERE "USER_ID"=$1', [params.id],
    (error, results)=>{
        if(error){
            res.status(500).send(error);
        }else{
            if(results.rowCount === 0){
                res.status(204).send("No User Found");
            }
            else{
                res.status(200).send(results.rows);

            }
            
        }
    });
  
}


exports.findUserEmail = async(req, res) =>{
    const params = req.params;

    client.query('SELECT * FROM "USERS" WHERE "EMAIL"=$1', [params.email],
    (error, results)=>{
        if(error){
            res.status(500).send(error)
        }
        else{
            if(results.rowCount === 0){
                res.status(204).send("User not found")
            }
            else{
                res.status(200).send(results.rows)
            }
        }
    })
}


//Call this function to create USER entry in DB
exports.createUser = async (req, res) => {
    if(!req.body){
        
        res.status(400).send({message:"Content cant be empty"});
    
    }
    else{
         //Insert register form from FRONTEND here !!!!!!!!!!!!!!!!!!!!!!!!!!
        const formData = req.body;
    
        client.query('INSERT INTO "USERS"("EMAIL","AUTHENTICITY","NAME","JOIN_DATE","USER_ID","PIC") VALUES($1, $2, $3, NOW(), nextval($4), $5)',
        [formData.EMAIL, formData.AUTHENTICITY, formData.NAME, 'user_id', formData.PIC], 
        (error, results)=>{
            if(error){
                res.status(500).send(error);
            }else{
                client.query('SELECT * FROM "USERS"', [], 
                (error, results)=>{
                    if(error){
                        res.status(500).send(error);
                    }else{
                        const newUserList = results.rows;
                        res.status(200).send(newUserList);
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
        }else{
            client.query('SELECT * FROM "USERS" WHERE "USER_ID"=$1', [params],
            (error, results)=>{
                if(error){
                    res.status(500).send(error);
                }else{
                    const updatedUserList = results;
                    res.status(200).send(updatedUserList.rows);
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


 


