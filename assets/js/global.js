/**
* DOCU: This will validate input if empty or not. <br>
* Triggered: index.js and dashboard.js <br>
* Last Updated Date: October 25, 2022
* @function
* @memberOf global.js
* @author Jerwin
*/  
validateInput = (selector) => {
    if(selector.value === ""){
        selector.classList.add("error_input");
    }
    else{
        selector.classList.remove("error_input");
    }
}

/**
* DOCU: This will generate random number for creating dummy message/comment ID <br>
* Triggered:  dashboard.js <br>
* Last Updated Date: October 25, 2022
* @function
* @memberOf global.js
* @author Jerwin
*/  
generateRandomID = () => {
    return Math.floor(Date.now() + Math.random());
}


/**
* DOCU: This will show Modal <br>
* Triggered: dashboard.js <br>
* Last Updated Date: October 25, 2022
* @function
* @memberOf global.js
* @author Jerwin
*/  
showModal = (modal_id) => {
    let modal = document.getElementById(modal_id);
    modal.style.display = "block";
}

/**
* DOCU: TThis will hide Modal <br>
* Triggered:  dashboard.js <br>
* Last Updated Date: October 25, 2022
* @function
* @memberOf global.js
* @author Jerwin
*/  
closeModal = (modal) => {
    modal.style.display = "none";
}