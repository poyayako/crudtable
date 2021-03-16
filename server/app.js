const path = require('path')
const express = require('express');

const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const dbService = require('./dbService');

app.use(cors());

app.use(express.static(path.join(__dirname,'./public')));

console.log(path.join(__dirname,'./public'));


app.use(express.json());
app.use(express.urlencoded({ extended : false }));



///PRODUCT GET ROUTES////
app.get('/:tblName/:id',(request,response) => {  
    const {tblName,id} = request.params;
    // console.log(tblname);
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData(tblName,id);
    
    result
   .then(data => response.json({data : data}))
   .catch(err => console.log(err));
});


//insert product
app.post('/insert/product',(request,response) => {

    const db = dbService.getDbServiceInstance();
    const result = db.insertProductData(request.body);
    

    result
    .then(data => response.json({ data : data}))
    .catch(err => console.log(err));
});


//update
app.patch('/update/',(request,response) => {
   
    const { id,name } = request.body;
   console.log(`ID: ${id} Name: ${name}`);
   const db = dbService.getDbServiceInstance();
   const result = db.updateRowByID(id,name);
   
   result
   .then(data => response.json({updated_data:data}))
   .catch(err => console.log(err));
    
});



//delete
app.delete('/delete/:id', (request,response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({deleted_data:data}))
    .catch(err => console.log(err));
})




app.listen(process.env.PORT , () => console.log('app is running'));