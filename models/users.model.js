

module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("USERS", {
        EMAIL:{
            type: Sequelize.CHAR(30)
        },
        AUTHENTICITY:{
            type: Sequelize.BOOLEAN
        },
        NAME:{
            type: Sequelize.CHAR(30)
        },
        JOIN_DATE:{
            type: Sequelize.DATE
        },
        USER_ID:{
            type: Sequelize.INTEGER
        },
        PIC:{
            type: Sequelize.BLOB
        }
        
        
    });

    return Users;
}