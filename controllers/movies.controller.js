const client = require('../config/db.config').user;

exports.getAllMovies = async (req, res) => {
    client.query('SELECT * FROM "MOVIE"', 
    (error, results)=>{
        if(error){
            res.status(500).send(error);
            console.log(error);
        }else{
            res.status(200).send(results.rows);
            
        }
    })
}

exports.getMovieName = async (req, res) =>{
    const name = req.params.name;
    console.log("%" + name + "%")
    const searchName = "%" + name + "%"

    client.query('SELECT * FROM "MOVIE" WHERE "TITLE" LIKE $1', [searchName], 
    (error, results)=>{
        if(error){
            res.status(500).send(error);
            console.log("500 GET movie by name SQL error")
        }else{
            if(results.rowCount === 0){
                res.status(400).send("No movie found")
                console.log("400 GET movie by name unsuccessful")
            }else{
                res.status(200).send(results.rows);
                console.log("200 GET movie by name successful")

            }
    
        }
    })

}

/*
exports.insertMovie = async (req, res) =>{
    if(!req.body){
        res.status(400).send("400 Request Body Empty!");
        console.log("GET 400 insertMovie Request Body Empty")
    }else{

        const formData = req.body;

        client.query('SELECT * FROM "MOVIE" WHERE "TITLE"=$1 AND "RELEASE_DATE"=$2', 
        [formData.TITLE, formData.RELEASE_DATE],
        (error, results)=>{
            if(error){
                res.status(500).send(error);
                console.log("500 SQL Server Error")

            } else if(results.rowCount === 0){
                client.query('INSERT INTO "MOVIE"("MOVIE_ID","PLOT","POSTER","TITLE","RELEASE_DATE") VALUES(nextval($1), $2, $3, $4, $5)',
                ['movie_id', formData.PLOT, formData.POSTER, formData.TITLE, formData.RELEASE_DATE], 
                (error, results)=>{
                    if(error){
                        res.status(500).send(error);
                        console.log(error);
                    }else{
                        client.query('SELECT * FROM "MOVIE"', [], 
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

            }else{
                res.status(400).send("Movie already exists");
                console.log("movie already in db");
            }
        })
    }
}


exports.deleteMovie = async (req, res) =>{
    const params = req.params;
    
    client.query('DELETE FROM "MOVIE" WHERE "MOVIE_ID"=$1', [params.id],
    (error, results)=>{
        if(error){
            res.status(500).send(error);
            console.log("500 SQL Server Error");
        }else{
            client.query('SELECT * FROM "MOVIE"', [], 
            (error, results)=>{
                if(error){
                    res.status(500).send(error);
                    console.log("DELETE 500 deleteMovie SQL error");
                }else{
                    const updatedMovieList = results;
                    res.status(200).send(updatedMovieList);
                    console.log("DELETE 200 deleteMovie Successful");
                }
            })
        }
    })
    
}
*/