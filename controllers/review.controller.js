const client = require('../config/db.config').user;

exports.getAllReviews = async (req, res) =>{
    client.query('SELECT * FROM "REVIEWS"', (error, results)=>{
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
    client.query( 'SELECT "MOVIE_ID","REVIEW_TEXT", "RATING", "USER_ID" FROM "REVIEWS" ORDER BY "REVIEW_ID"  DESC LIMIT 5', (error, results)=>{
        if(error){
            res.status(500).send(error)
            
        }else{
            if(results.rowCount === 0){
                res.status(200).send("No results")
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
        client.query('SELECT * FROM "REVIEWS" WHERE "MOVIE_ID"=$1', [movieID], (error, results)=>{
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
        const formData = req.body
        client.query('INSERT INTO "REVIEWS"("MOVIE_ID", "REVIEW_ID", "REVIEW_TEXT", "RATING", "USER_ID") VALUES($1, nextval($2), $3, $4, $5)', 
        [formData.movieID,  'review_id',formData.review, formData.rating, formData.userID], 
        (error, results)=>{
            if(error){
                res.status(508).send(error.message);
            }else{
                client.query('SELECT * FROM "REVIEWS"', [], 
                (error, results)=>{
                    if(error){
                        res.status(501).send(error)
                    }else{
                        res.status(200).send(results.rows)
                    }
                })
            }
        })
    }

}

exports.getReviewByRID = async(req, res)=>{
    if(!req.params){
        res.status(400).send("Request cant be empty!")
    }else{
        const reviewID = req.params.rid;
        console.log(reviewID)
        client.query('SELECT * FROM "REVIEWS" WHERE "REVIEW_ID"=$1', [reviewID], (error, results)=>{
            if(error){
                res.status(501).send(error)
            }else{
                if(results.rowCount === 0){
                    res.status(204).send("No Reviews from that User in DB")
                }else{
                    res.status(200).send(results.rows)
                }
            }
        })


    }

}


exports.getReviewsByUID = async(req, res)=>{
    if(!req.params){
        res.status(400).send("Request cant be empty!")
    }else{
        const userID = req.params.uid;
        console.log(userID)
        client.query('SELECT * FROM "REVIEWS" WHERE "USER_ID"=$1', [userID], (error, results)=>{
            if(error){
                res.status(501).send(error)
            }else{
                if(results.rowCount === 0){
                    res.status(204).send("No Reviews from that User in DB")
                }else{
                    res.status(200).send(results.rows)
                }
            }
        })


    }

}