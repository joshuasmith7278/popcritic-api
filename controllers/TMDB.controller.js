
exports.getAllReviews = async (req, res) =>{
    try{
        const url = 'https://api.themoviedb.org/3/movie/now_playing';
        const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmVlOGVkMzI3NmE4ZTU4MzJlZjVjNmFjMjhjOWRjYyIsInN1YiI6IjY2MjZmYWZmNjJmMzM1MDE2NGQ5NTlhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.02jfJBBnUivAF7GszxxGFGX16wS3DUaGmY18Db96Sco'
        }
        };
    
        console.log("Get Recent Movies TMBD Controller")
    
   
        await fetch(url, options)
        .then(res =>  res.json())
        .then(json => res.status(200).send(json))
        .catch(err => console.error('error:' + err));
     
        

    } catch(error){
        console.log(error)
    }
    

}

exports.getImages = async (req, res) =>{

    if(!req.params){
        res.status(400).send("Request cant be empty!")
    }else{
        const movieID = req.params.mid;
        try{
            const url = 'https://api.themoviedb.org/3/movie/' + movieID + '/images';
            const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmVlOGVkMzI3NmE4ZTU4MzJlZjVjNmFjMjhjOWRjYyIsInN1YiI6IjY2MjZmYWZmNjJmMzM1MDE2NGQ5NTlhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.02jfJBBnUivAF7GszxxGFGX16wS3DUaGmY18Db96Sco'
            }
            };
        
            console.log("Get Images TMBD Controller")
        
    
            await fetch(url, options)
            .then(res =>  res.json())
            .then(json => res.status(200).send(json))
            .catch(err => console.error('error:' + err));
        
            

        } catch(error){
            console.log(error)
        }
    }
    

}