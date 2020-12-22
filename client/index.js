
const addBtn = document.querySelector('#add-name-btn');

const cancelBtn = document.querySelector('.show-cancel-edit-btn');


// addBtns.addEventListener('click',function(){

//     log('leoleo');

// });


document.addEventListener('DOMContentLoaded',function(){
    fetch('http://localhost:5000/getall')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});


addBtn.onclick = function (){
    const nameInput = document.querySelector('#name-input'); 
    const name = nameInput.value;
    nameInput.value ="";

    fetch('http://localhost:5000/insert',{
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name : name})
    })
    .then(response => response.json())
    .then(data =>  insertRowIntoTable(data['data']));
    
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

    tableHTML += `<td><button class="delete-row-btn" data-id="${data.id}">Delete</button></td>`;
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



function loadHTMLTable(data){

    const table = document.querySelector('table tbody');

    if(data.length === 0){
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data!</td></tr>";
    }else{
        let tableHTML = '';

        data.forEach(function ({id,name,date_added}){
            tableHTML += "<tr>";
            tableHTML += `<td>${id}</td>`;
            tableHTML += `<td>${name}</td>`;
            tableHTML += `<td>${new Date(date_added).toLocaleString()}</td>`;
            tableHTML += `<td><button class="delete-row-btn" data-id="${id}">Delete</button></td>`;
            tableHTML += `<td>
            <button class="show-edit-row-btn" data-id="${id}">Edit</button>
            <button class="hide-save-edit-btn" data-id="${id}">Save</button>
            <button class="hide-cancel-edit-btn" data-id="${id}">Cancel</button>
            </td>`;
            tableHTML += "</tr>";
        });

        table.innerHTML = tableHTML;
    }
    
    

}

//Selecting each delete button inside the Table
document.querySelector('table tbody').addEventListener('click',function(event) {
    if(event.target.className === "delete-row-btn") {
        //delete row in frontend
        document.getElementById("table").deleteRow(event.target.parentNode.parentNode.rowIndex);
        deleteRowByID(event.target.dataset.id);    
    }
    
    if(event.target.className === "show-edit-row-btn"){
        
        revealSaveCancelBtn(event.target);

    }
    if(event.target.className === "show-cancel-edit-btn"){
        hideSaveCancelBtn(event.target);
    }
});



  
function deleteRowByID(id){
    fetch('http://localhost:5000/delete/' + id,
    {
         method : 'DELETE' 
    })
    .then(response => response.json())
    .then(data => console.log(data));
  
}


function revealSaveCancelBtn(element){
    if(stillEditing()){
        showDialogBox();

    }else{
        const editBtn = element.parentNode.childNodes[1];
        const saveBtn = element.parentNode.childNodes[3];
        const cancelBtn = element.parentNode.childNodes[5];
        
        makeRowEditable(element);
    

        editBtn.classList.toggle('hide-edit-row-btn',true);
        editBtn.classList.toggle('show-edit-row-btn',false);
        saveBtn.classList.toggle('show-save-edit-btn',true);
        saveBtn.classList.toggle('hide-save-edit-btn',false);
        cancelBtn.classList.toggle('show-cancel-edit-btn',true);
        cancelBtn.classList.toggle('hide-cancel-edit-btn',false);

    }
}

function makeRowEditable(element){

    const fullRow = element.parentNode.parentNode;
    const rowCount = fullRow.childElementCount - 3;
    let editableCells = [];
    for(let x = 1;x<=rowCount;x++){
        
        const currentCellOfRow = element.parentNode.parentNode.childNodes[x];
        const sessionStorageKey = 'cell' + x;
        currentCellOfRow.contentEditable = "true";
      
        editableCells.push(currentCellOfRow);
        log(sessionStorageKey + " " + currentCellOfRow.textContent);
        sessionStorage.setItem(sessionStorageKey, currentCellOfRow.innerHTML);
    }

    editableCells[0].onblur = function(event) {
        const test = sessionStorage.getItem('cell1');
        log(sessionStorage);
    }
    
    
    editableCells[0].focus();
}

//function tempSaveValues() {
  //  const sampleArray = [];
//}


function hideSaveCancelBtn(element){
    const editBtn = element.parentNode.childNodes[1];
    const saveBtn = element.parentNode.childNodes[3];
    const cancelBtn = element.parentNode.childNodes[5];
    
    editBtn.classList.toggle('hide-edit-row-btn',false);
    editBtn.classList.toggle('show-edit-row-btn',true);
    saveBtn.classList.toggle('show-save-edit-btn',false);
    saveBtn.classList.toggle('hide-save-edit-btn',true);
    cancelBtn.classList.toggle('show-cancel-edit-btn',false);
    cancelBtn.classList.toggle('hide-cancel-edit-btn',true);
       
}

function stillEditing(){
    
    const saveBtn = document.querySelectorAll('.show-save-edit-btn');

    for(let btn of saveBtn){
        return true;
        break;
    }
    return false;

}

function showDialogBox(msg,type){

    const modal = document.getElementById('myModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const modalContent = document.getElementsByClassName('modal-content');
    console.log(closeBtn);

    
    closeBtn.onclick = function() {
            modal.style.display = "none";
        
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    
      modal.style.display = "block";
      

}

const log = params => {

    console.log(params);

}