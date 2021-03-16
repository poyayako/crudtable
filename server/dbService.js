const mysql = require('mysql');
const dotenv = require('dotenv');
const {productsValidation} = require('./validation');
const { resolve } = require('path');
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

    async getAllData(tblName,id){
        try{
            const response = await new Promise((resolve,reject) =>{
                
                var query = "";
                if(tblName == 'products' && id == 'all'){
                    query = "SELECT * FROM showallproducts;";
                }else if(tblName == 'category' && id=='all'){
                    query = "SELECT * FROM tblcategory;";
                }else if(tblName == 'size'){
                    query = "SELECT * FROM tblsize;";
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

    async insertProductData(data){
        try{
            const dateAdded = new Date();
            const productCode = "testcode";
            const insertProduct = await new Promise((resolve,reject) =>{
                const prodStatus = "Active";
                const { error } = productsValidation(data);

                if(error==null || error == undefined || error==""){
                    const { prodName,prodCategory,prodDescription,prodPrice,prodSize } = data;
                    const query = "INSERT INTO tblproduct(PRODUCTCODE,PRODUCTNAME,PRODUCTDESC,PRODSIZE_ID,PRODCAT_ID,PRODUCTPRICE,PRODUCTSTATUS,DATEUPDATED)VALUES(?,?,?,?,?,?,?,?)";
                    
                    connection.query(query,[productCode,prodName,prodDescription,prodSize,prodCategory,prodPrice,prodStatus,dateAdded], (err,result) => {
                        if(err) reject(new Error(err.message));
            
                        resolve(result.insertProduct);
                    })
                }else{
                    resolve(error);
                }
            });
            return insertProduct;
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