const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({

    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
    port : process.env.DB_PORT

});


connection.connect((err) => {
    if(err){
        console.log(err.message);
    }
    //if connection is established
    console.log('db ' + connection.state);
});


class DbService{
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }

    async getAllData(tblName){
        try{
            const response = await new Promise((resolve,reject) =>{
                var query = "";
                if(tblName == 'products'){
                    query = "SELECT * FROM getAllProduct;";
                }else if(tblName == 'prodcategory'){
                    query = "SELECT * FROM tblcategory;";
                }else if(tblName == 'suppliers'){
                    query = "SELECT * FROM tblsupplier;";
                }
    
                connection.query(query, (err,results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            //console.log(response);
            return response;

        }catch (error){
            console.log(error);
        }
    }

    async insertData(name){
        try{
            const dateAdded = new Date();
            const insertId = await new Promise((resolve,reject) =>{
                

                const query = "INSERT INTO names (name,date_added) VALUES (?,?);";
                
                connection.query(query,[name,dateAdded], (err,result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            //.console.log(insertId);
            return {
                id : insertId,
                name : name,
                dateAdded : dateAdded
            };

        }catch (error){
            console.log(error);
        }
    }

    async deleteRowById(id){
        try{

            id = parseInt(id,10);
            const response = await new Promise((resolve,reject) =>{
                
                const query = "DELETE FROM names WHERE id = ?;";
                
                connection.query(query,[id], (err,result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result);
                })
            });

            return id;
            

        }catch(error){
            console.log(error);
        }

    }

    async updateRowByID(id,name){
        try{

            id = parseInt(id,10);
            const response = await new Promise((resolve,reject) =>{
                
                const query = `UPDATE names SET name = ? WHERE id = ?;`;
                
                connection.query(query,[name,id], (err,result) => {
                    if(err) reject(new Error(err.message));
                        resolve(result.affectedRows);
                })
            });

            return 'data-updated : '+id;
                

        }catch(error){
            console.log(error);
        }

    }

}

module.exports = DbService;