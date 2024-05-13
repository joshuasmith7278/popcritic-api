const client = require('../config/db.config').user;


exports.getLikeReviewID = async(req, res)=>{
    if(!req.params){
        res.status(400).send("Request cant be empty!")
    }else{
        const reviewID = req.params.rid;
        console.log(reviewID)
        client.query('SELECT * FROM "LIKES" WHERE "REVIEW_ID"=$1', [reviewID], (error, results)=>{
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

exports.getLikesUserID = async(req, res)=>{
    if(!req.params){
        res.status(400).send("Request cant be empty!")
    }else{
        const userID = req.params.uid;
        client.query('SELECT * FROM "LIKES" WHERE "USER_ID"=$1', [userID], (error, results)=>{
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

exports.getLikesUserIDandMovieID = async(req, res)=>{
    if(!req.params){
        res.status(400).send("Request cant be empty!")
    }else{
        const body = req.params;
        client.query('SELECT * FROM "LIKES" WHERE "USER_ID"=$1 AND "MOVIE_ID"=$2', [body.uid, body.mid], (error, results)=>{
            if(error){
                res.status(509).send(error)
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




exports.addLike = async(req, res) => {
    if(!req.body){
        res.status(400).send("HTTP Request cannot be empty")
    }else{
        const formData = req.body
        let resultsLength = 0
        
        client.query('SELECT * FROM "LIKES" WHERE "REVIEW_ID"=$1', [formData.reviewID], 
            (error, results)=>{
                console.log(results.rows.length)
                if(error){
                    res.status(500).send(error)
                }else{
                    if(results.rows.length === 0){
                        client.query('INSERT INTO "LIKES"("LIKE_ID", "USER_ID", "REVIEW_ID", "MOVIE_ID") VALUES(nextval($1), $2, $3, $4)', 
                        ['like_id', formData.userID, formData.reviewID, formData.movieID], 
                            (error, results)=>{
                                if(error){
                                    res.status(500).send(error);
                                }else{
                                    client.query('SELECT * FROM "LIKES" WHERE "REVIEW_ID"=$1', [formData.reviewID], 
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

})
    }
}
    



exports.deleteLike = (req, res) => {
    const params = req.params;
    
    client.query('DELETE FROM "LIKES" WHERE "LIKES_ID"=$1', [params.id],
    (error, results)=>{
        if(error){
            res.status(500).send(error);
        }else{
            client.query('SELECT * FROM "LIKES"', [params.id], 
            (error, results)=>{
                if(error){
                    res.status(500).send(error);
                }else{
                    res.status(200).send(results.rows);
                }
            })
        }
    })

}