const client = require('../config/db.config').user;

exports.getAllReviews = async (req, res) =>{
    client.query('SELECT * FROM "MOVIE_USERS" ORDER BY "REVIEW_ID" DESC LIMIT 3', (error, results)=>{
        if(error){
            res.status(500).send(error);
        }else{
            if(results.rowCount === 0){
                res.status(204).send("No reviews in DB")
            }else{
                res.status(200).send(results.rows)
            }
        }
    })

}


exports.getHomeReviews = async (req, res)=>{
    client.query( 'SELECT "TITLE","POSTER","REVIEW_TEXT", "RATING", "MOVIE_MOVIE_ID" FROM "MOVIE" INNER JOIN "MOVIE_USERS" ON "MOVIE_ID"="MOVIE_MOVIE_ID" ORDER BY "REVIEW_ID"  DESC LIMIT 3', (error, results)=>{
        if(error){
            res.status(500).send(error)
            
        }else{
            if(results.rowCount === 0){
                res.status(400).send("No Reviews")
            }else{
                res.status(200).send(results.rows)
            }
        }
    }
    )
}


exports.getRevByMovieID = async(req, res)=>{
    if(!req.params){
        res.status(400).send("Request cant be empty!")
    }else{
        const movieID = req.params.mid;
        console.log(movieID)
        client.query('SELECT * FROM "MOVIE_USERS" WHERE "MOVIE_MOVIE_ID"=$1', [movieID], (error, results)=>{
            if(error){
                res.status(501).send(error)
            }else{
                if(results.rowCount === 0){
                    res.status(204).send("No reviews in DB")
                }else{
                    res.status(200).send(results.rows)
                }
            }
        })


    }
    
}



exports.createReview = async(req, res) => {
    if(!req.body){
        res.status(400).send("HTTP Request cannot be empty")
    }else{
        const movieID = req.body.mid;
        const userID = req.body.uid;
        const review = req.body.rev;
        const rating = req.body.rat;
        client.query('INSERT INTO "MOVIE_USERS"("MOVIE_MOVIE_ID", "USERS_USER_ID", "REVIEW_ID", "REVIEW_TEXT", "RATING") VALUES($1, $2, nextval($3), $4, $5)', 
        [movieID, userID, 'review_id', review, rating], 
        (error, results)=>{
            if(error){
                res.status(500).send(error);
            }else{
                client.query('SELECT * FROM "MOVIE_USERS"', [], 
                (error, results)=>{
                    if(error){
                        res.status(500).send(error)
                    }else{
                        res.status(200).send(results.rows)
                    }
                })
            }
        })
    }

}