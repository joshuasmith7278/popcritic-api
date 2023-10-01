const client = require('../config/db.config').user;

exports.getAllReviews = async (req, res) =>{
    client.query('SELECT * FROM "MOVIE_USERS"', (error, results)=>{
        if(error){
            res.status(500).send(error);
        }else{
            if(results.rowCount === 0){
                res.status(212).send("No reviews in DB")
            }else{
                res.status(206).send(results.rows)
            }
        }
    })

}