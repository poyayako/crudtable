const wrapperState = document.getElementById('wrapper');
const toggleBtn = document.getElementById('menu-toggle');
window.onload = () => {
    wrapperState.setAttribute('class','d-flex toggled');
    toggleBtn.innerHTML = "Show Menu";
    
    
}

const loadContent = (contentToLoad) => {
    var CTL = '';
    if(contentToLoad=="productlist"){
        CTL = 'productlist.html';
    }

    const contentLoader = document.createElement('object');
    contentLoader.setAttribute('type','text/html');
    contentLoader.setAttribute('data',CTL);
    contentLoader.setAttribute('id','contentLoaderObject');
    contentLoader.setAttribute('style','width:100%;height:100vh;margin:0px;')
    const mainContent = document.getElementById("main-content");
    const existingContentLoader = document.getElementById('contentLoaderObject');
    
     if(existingContentLoader==null || existingContentLoader==undefined){
        mainContent.appendChild(contentLoader);    
    }
    
    
     
}


const btnToggleMenuTextChanger = (e) => {
    if(wrapperState.className === "d-flex toggled"){
        toggleBtn.innerHTML = "&#9776";
    }else{
        toggleBtn.innerHTML = "Show Menu";
    }
}




