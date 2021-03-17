


const addProductBtn = document.getElementById('addproductbtn');
//Modal Components
const modalTitle = document.getElementById('modaltitle');
const saveToDbBtn = document.getElementById('save-btn');
const cancelBtn = document.querySelector('.show-cancel-edit-btn');
const alertbox = document.getElementById('alertbox');
const productStatusGroup = document.getElementById('productstatus');
const productCodeGroup = document.getElementById('productcode');

const txtProdName = document.getElementById('prodname');
const txtProdCode = document.getElementById('prodcode');
const cmbProdStatus = document.getElementById('prodstatus');
const cmbProdCategory = document.getElementById('prodcategory');
const txtProdPrice = document.getElementById('prodprice');
const cmbProdSize = document.getElementById('prodsize');
const txtProdDescription = document.getElementById('proddescription');

let action = ''


//Add Product Button
addProductBtn.addEventListener('click',(event)=>{

    action = 'addproduct';
    productCodeGroup.style.display = 'none';

    alertbox.style.display = 'none';
    productStatusGroup.style.display = "none";
    modalTitle.innerHTML = 'Add New Product';
    

})

document.addEventListener('DOMContentLoaded',function(){
    
    fetch('http://localhost:5000/products/all')
    .then(response =>response.json())
    .then(data =>loadHTMLTable(data['data']));
    
    getAllCategories();
    getAllSizes();
});

//EDIT BUTTON FUNCTIONALITY
document.querySelector('table tbody').addEventListener('click',function(event) {
    
    action = "editproduct";
    setModalFieldsValue();  
 
});

const setModalFieldsValue = () =>{
    const prodCodeCell = event.target.parentNode.parentNode.childNodes[1];
    const prodNameCell = event.target.parentNode.parentNode.childNodes[2];
    const prodPriceCell = event.target.parentNode.parentNode.childNodes[3];
    const prodDescCell = event.target.parentNode.parentNode.childNodes[4];
    const prodStatusCell = event.target.parentNode.parentNode.childNodes[5];
    const prodSizeCell = event.target.parentNode.parentNode.childNodes[6];
    const prodCategoryCell = event.target.parentNode.parentNode.childNodes[7];
    const modalTitle = document.getElementById('modaltitle');

    const cmbCategoryOptions = cmbProdCategory.options;
    const cmbSizeOptions = cmbProdSize.options;

    alertbox.style.display = 'none';
    modalTitle.innerHTML = 'Edit Product';
    productStatusGroup.style.display = "block";
    productCodeGroup.style.display = 'block';
    

    if(prodStatusCell.innerHTML == 'Active'){
        cmbProdStatus.selectedIndex = "0";
    }
    if(prodStatusCell.innerHTML== 'Inactive'){
        cmbProdStatus.selectedIndex = "1";
    }
    if(prodStatusCell.innerHTML == 'Obsolete'){
        cmbProdStatus.selectedIndex = "2";
    }

    let cmbCatSelectedIndex = 0;
    for(let x = 0;x<=cmbCategoryOptions.length-1;x++){
        if(prodCategoryCell.innerHTML == cmbCategoryOptions[x].innerHTML ){
            cmbCatSelectedIndex = x;
            break;
        }
    }
    
    let cmbSizeSelectedIndex = 0;
    for(let x = 0;x<=cmbSizeOptions.length-1;x++){
        if(prodSizeCell.innerHTML == cmbSizeOptions[x].innerHTML ){
            cmbSizeSelectedIndex = x;
            break;
        }
    }

    
    cmbProdCategory.selectedIndex = cmbCatSelectedIndex;
    cmbProdCategory.selectedIndex = cmbCatSelectedIndex;
    txtProdName.value = prodNameCell.innerHTML;
    txtProdCode.value = prodCodeCell.innerHTML;
    txtProdPrice.value = prodPriceCell.innerHTML;
    txtProdDescription.value = prodDescCell.childNodes[0].innerHTML;
    
}



const confirmAction = (msg,action) => {
    const dialogBoxBody = document.querySelector('.modal-body');
    // const btnYes = document.getElementById('savebtn');
    // const btnNo = document.getElementById('nobtn');
    btnYes.onclick = () => {
        console.log('deleterow');
    }
    btnNo.onclick = () => {
        console.log('cancelAction');
    }
    dialogBoxBody.innerHTML = msg;
}
///////////////////////////////LOAD DROPDOWN DATA/////////////////////
const loadCategoryDropdown = (data) => {    
    const categoryDropdown = document.getElementById('prodcategory');
    let listHTML = "";
    data.forEach(data=>{
        listHTML += `<option value='${data['CATEGORY_ID']}'>${data['CATEGORYTYPE']}</option>`;
    })
    console.log(listHTML);
    categoryDropdown.innerHTML = listHTML;
}

const loadSizesDropdown = (data) => {    
    const sizesDropdown = document.getElementById('prodsize');
    let listHTML = "";
    data.forEach(data=>{
        const size = `${data['SIZE']} `+`-`+` ${data['SIZEDESC']}`;
        listHTML += `<option value='${data['SIZE_ID']}'>${size}</option>`;
    })
    console.log(listHTML);
    sizesDropdown.innerHTML = listHTML;
}

const getAllCategories = () => {
    fetch('http://localhost:5000/category/all')
    .then(response =>response.json())
    .then(data =>loadCategoryDropdown(data['data']));
}

const getAllSizes = () => {
    fetch('http://localhost:5000/size/all')
    .then(response =>response.json())
    .then(data =>loadSizesDropdown(data['data']));
}
///////////////////////////////LOAD DROPDOWN DATA/////////////////////


//INSERT Product Data To Database
saveToDbBtn.onclick = () => {
    
    const prodName = document.getElementById('prodname');
    const prodCategory = document.getElementById('prodcategory');
    const prodPrice = document.getElementById('prodprice');
    const prodSize = document.getElementById('prodsize');
    const prodDescription = document.getElementById('proddescription');
    
    fetch('http://localhost:5000/insert/product',{
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            prodName : prodName.value,
            prodCategory: prodCategory.value,
            prodPrice: prodPrice.value,
            prodSize: prodSize.value,
            prodDescription: prodDescription.value
        })
    })
    .then(response => response.json())
    .then(data => displayAlert(data));
}

const displayAlert = (data) => {
    const datakeys = Object.keys(data);
    const alertbox = document.getElementById('alertbox');
    
    if(datakeys.length == 0){
        console.log('sasda')
        alertbox.innerHTML = "Data successfully added to the database!"
        alertbox.classList.replace('alert-warning','alert-success');
        alertbox.style.display ="block";
        clearInputs();
    }
    if(datakeys.length == 1){
        alertbox.innerHTML = data['data']['details'][0].message;
        alertbox.classList.replace('alert-success','alert-warning');
        alertbox.style.display = "block";
    }
}

const clearInputs = () => {
    const prodName = document.getElementById('prodname');
    const prodCategory = document.getElementById('prodcategory');
    const prodPrice = document.getElementById('prodprice');
    const prodSize = document.getElementById('prodsize');
    const prodDescription = document.getElementById('proddescription');

    prodName.value = '';
    prodCategory.value = '';
    prodPrice.value = '';
    prodSize.value = '';
    prodDescription.value = '';
}


  
// function deleteRowByID(id){
//     fetch('http://localhost:5000/delete/' + id,
//     {
//          method : 'DELETE' 
//     })
//     .then(response => response.json())
//     .then(data => log(data));
// }

function updateRowByID(id,name){
    fetch('http://localhost:5000/update/',
    {
        headers: {
            'Content-type': 'application/json'
        },
        method : 'PATCH',
         body : JSON.stringify({
            id : id,
            name : name
         })
    })
    .then(response => response.json())
    .then(data => log(data));

}


//My Methods Goes Here//



function loadHTMLTable(data){
    //console.log(Object.keys(data[0]));
    const columnHeader = Object.keys(data[0]);
    const headerCount = columnHeader.length;
    tblColGenerator(columnHeader);
    
    const table = document.querySelector('table tbody');

    if(data.length === 0){
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data!</td></tr>";
    }else{
        let tableHTML = '';
      
        data.forEach(function (index){
            const columnKeys = Object.values(index);
            const dataStatusColumn = columnKeys[5];
            const descColIndex = 4;
            if(dataStatusColumn=="Active"){
                tableHTML += "<tr class='table-success'>";
            }else if(dataStatusColumn=="Inactive"){
                tableHTML += "<tr class='table-danger'>";
            }else if(dataStatusColumn=="Obsolete"){
                tableHTML += "<tr class='table-warning'>";
            }
            
            for(let x = 0;x<=headerCount-1;x++){
                if(x==descColIndex){
                    tableHTML += `<td><span class="d-inline-block text-truncate" id="decriptionspan" style="max-width: 300px;">${columnKeys[x]}</span></td>`;
                }else{
                    tableHTML += `<td>${columnKeys[x]}</td>`;
                }
                
            }
            
            tableHTML += `<td>
                <button class="btn btn-warning btn-sm show-edit-row-btn" data-toggle="modal" data-target="#inputForm" data-id="${columnKeys[0]}">Edit</button>
                <button class="hide-save-edit-btn" data-id="${columnKeys[0]}">Save</button>
                <button class="hide-cancel-edit-btn" data-id="${columnKeys[0]}">Cancel</button>
                </td>`;
            tableHTML += "</tr>";
        });

        table.innerHTML = tableHTML;
    }
    

}

function insertRowIntoTable(data){
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHTML = "<tr>";

    for(var key in data){    
        if(data.hasOwnProperty(key)){
            if(key === 'dateAdded'){
                data[key] = new Date(data[key]).toLocaleString();
            }
            
            tableHTML += `<td>${data[key]}</td>`;
            
        }   
    }

    tableHTML += `<td><button class="btn btn-danger btn-sm delete-row-btn" data-id="${data.id}">Delete</button></td>`;
    tableHTML += `<td>
    <button class="show-edit-row-btn" data-id="${data.id}">Edit</button>
    <button class="hide-save-edit-btn" data-id="${data.id}" hidden>Save</button>
    <button class="hide-cancel-edit-btn" data-id="${data.id}" hidden>Cancel</button>
    </td>`;

    tableHTML += "</tr>";

    if(isTableData){
        table.innerHTML = tableHTML;
    }else{
        const newRow = table.insertRow();
        newRow.innerHTML = tableHTML;
    }
}

const tblColGenerator = (columnList) => {
    const tableHead = document.querySelector('table thead');
    let tableColumns = '';
    columnList.forEach(function(col){
        tableColumns += `<th>${col}</th>`;
    })
    tableColumns += '<th colspan="2">ACTIONS</th>';
    tableHead.innerHTML = tableColumns;
}
// function revealSaveCancelBtn(element){
    
//     const editBtn = element.parentNode.childNodes[1];
//     const saveBtn = element.parentNode.childNodes[3];
//     const cancelBtn = element.parentNode.childNodes[5];

    
//     if(stillEditing()){
//         showDialogBox();
//     }else{
//         makeRowEditable(element);
//         editBtn.classList.toggle('hide-edit-row-btn',true);
//         editBtn.classList.toggle('show-edit-row-btn',false);
//         saveBtn.classList.toggle('show-save-edit-btn',true);
//         saveBtn.classList.toggle('hide-save-edit-btn',false);
//         cancelBtn.classList.toggle('show-cancel-edit-btn',true);
//         cancelBtn.classList.toggle('hide-cancel-edit-btn',false);

//     }
// }

