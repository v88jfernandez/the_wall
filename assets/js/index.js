document.addEventListener("DOMContentLoaded", function(){
    /* Click event lister for toggle showing of sign up form */ 
    let show_sign_up_button = document.getElementById("show_sign_up_button");
    show_sign_up_button.addEventListener("click", () => {
        toggleShowLoginForm(show_sign_up_button);
    });

    /* Click event lister for toggle showing of sign in form */ 
    let show_sign_in_button = document.getElementById("show_sign_in_button");
    show_sign_in_button.addEventListener("click", () => {
        toggleShowLoginForm(show_sign_in_button);
    });

    /* Form Submit event listener for login form */ 
    document.getElementById("login_form").addEventListener("submit", submitLoginForm);

    /* Form Submit event listener for register form */ 
    document.getElementById("register_form").addEventListener("submit", submitRegisterForm);
});


/**
* DOCU: This will handle toggle show/hide of login/register form <br>
* Triggered: #show_sign_up_button and #show_sign_in_button<br>
* Last Updated Date: October 25, 2022
* @function
* @memberOf index.js
* @author Jerwin
*/  
toggleShowLoginForm = (selector) => {
    selector.closest("form").classList.add("hidden");
    
    /* Show's the register/sign up form */ 
    if(selector.id === "show_sign_up_button"){
        selector.closest("form").nextElementSibling.classList.remove("hidden");
    }
    /* Show's the login/sign in form */ 
    else{
        selector.closest("form").previousElementSibling.classList.remove("hidden");
    }
}

/**
* DOCU: This will handle login form submission. <br>
* Triggered: #login_form <br>
* Last Updated Date: October 25, 2022
* @function
* @memberOf index.js
* @author Jerwin
*/  
submitLoginForm = (event) => {
    event.preventDefault();
    let login_inputs = document.querySelectorAll("#login_form input");

    /* This will validate form inputs if empty inside the login form */ 
    for (let counter = 0; counter < login_inputs.length; counter++) {
        validateInput(login_inputs[counter]);
    }

    /* If the form inputs are all passed, redirect the user inside dashboard page */ 
    if(!document.querySelectorAll("#login_form .error_input").length){
        window.location.replace("dashboard.html");
    }
}

/**
* DOCU: This will handle submitting of register form with validation. <br>
* Triggered: #register_form <br>
* Last Updated Date: October 25, 2022
* @function
* @memberOf index.js
* @author Jerwin
*/  
submitRegisterForm = (event) => {
    event.preventDefault();
    let register_inputs                 = document.querySelectorAll("#register_form input");
    let register_password_input         = document.getElementById("register_password_input");
    let register_confirm_password_input = document.getElementById("register_confirm_password_input");
    let error_message                   = document.querySelector(".error_message");
    
    /* This will validate form inputs if empty inside the register form */ 
    for (let counter = 0; counter < register_inputs.length; counter++) {
        validateInput(register_inputs[counter]);
    }

    /* This will validate if password and confirm password are not match. */ 
    if(register_password_input.value !== register_confirm_password_input.value){
        register_password_input.classList.add("error_input");
        register_confirm_password_input.classList.add("error_input");
        
        error_message.textContent = "Please make sure your passwords match";
    }
    /* Reset's the error message text */ 
    else{
        error_message.textContent = "";
    }

    /* If the form inputs are all passed, redirect the user inside dashboard page */ 
    if(!document.querySelectorAll("#register_form .error_input").length){
        window.location.replace("dashboard.html");
    }
}
