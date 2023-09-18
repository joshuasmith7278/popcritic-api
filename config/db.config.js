const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();


const testDBConn = async () => {
    try{
        const client = new Client(
            {
                user:process.env.PGUSER,
                host:process.env.PGHOST,
                database:process.env.PGDATABASE,
                password:process.env.PGPASSWORD,
                port:process.env.PGPORT
            }
        )
        await client.connect();
        console.log("Postgres DB conn successful");
        await client.end();
        
    }
    catch (error){
        console.log(error);
    }

}

const user = new Client(
    {
        user:process.env.PGUSER,
        host:process.env.PGHOST,
        database:process.env.PGDATABASE,
        password:process.env.PGPASSWORD,
        port:process.env.PGPORT 
    }
);

user.connect();

module.exports = {testDBConn, user}





