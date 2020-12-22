const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const dbService = require('./dbService');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended : false }));


//create
app.post('/insert',(request,response) => {

    const { name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewName(name);
    
    result
    .then(data => response.json({ data : data}))
    .catch(err => console.log(err));
});


//read
app.get('/getall',(request,response) => {  

    const db = dbService.getDbServiceInstance();

   const result = db.getAllData();

   result
   .then(data => response.json({data : data}))
   .catch(err => console.log(err));

});


//update




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