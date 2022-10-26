document.addEventListener("DOMContentLoaded", function(){
    /* Message - Click event listener for showing create message modal */ 
    document.getElementById("create_message_button").addEventListener("click", showCreateMessageModal);
    /* Message - Submit event listener for creating new message */ 
    document.getElementById("create_message_form").addEventListener("submit", submitCreateNewMessageForm);
    /* Message - Submit event listener for deleting message */ 
    document.getElementById("delete_message_form").addEventListener("submit", submitDeleteMessageForm);
    /* Comment - Submit event listener for deleting comment */ 
    document.getElementById("delete_comment_form").addEventListener("submit", submitDeleteCommentForm);

    /* Message - Click Event listener for delete_message_button that will trigger showing of delete message modal */ 
    let delete_message_button = document.querySelectorAll(".delete_message_button");
    for (let delete_message_button_counter = 0; delete_message_button_counter < delete_message_button.length; delete_message_button_counter++) {
        delete_message_button[delete_message_button_counter].addEventListener("click", showDeleteMessageModal);
    }

    /* Message - Click Event listener for Toggle Show Comments */ 
    let comments_button = document.querySelectorAll(".comments_button");
    for (let comments_button_counter = 0; comments_button_counter < comments_button.length; comments_button_counter++) {
        comments_button[comments_button_counter].addEventListener("click", toggleShowComments);
    }

    /* Comment - Click event listener for showing the Confirm Delete Message modal */ 
    let delete_comment_button = document.querySelectorAll(".delete_comment_button");
    for (let delete_comment_button_counter = 0; delete_comment_button_counter < delete_comment_button.length; delete_comment_button_counter++) {
        delete_comment_button[delete_comment_button_counter].addEventListener("click", showDeleteCommentModal);
    }

    /* Comment - Submit event listener for creating comment */ 
    let create_comment_form = document.querySelectorAll(".create_comment_form");
    for (let create_comment_form_counter= 0; create_comment_form_counter < create_comment_form.length; create_comment_form_counter++) {
        create_comment_form[create_comment_form_counter].addEventListener("submit", submitCreateCommentForm);
    }

    /* Message/Comment - Click Event listener for showing the editor for editing message or comment text */ 
    let edit_button = document.querySelectorAll(".edit_button");
    for (let edit_button_counter = 0; edit_button_counter < edit_button.length; edit_button_counter++) {
        edit_button[edit_button_counter].addEventListener("click", showEditMessage);
    }

    /* Message/Comment - Click event listener for closing the modal */ 
    let close_modal_button = document.querySelectorAll(".close_modal_button");
    for (let close_modal_button_counter = 0; close_modal_button_counter < close_modal_button.length; close_modal_button_counter++) {
        close_modal_button[close_modal_button_counter].addEventListener("click", function() {
            closeModal(close_modal_button[close_modal_button_counter].closest(".modal"));
        });
    }

    /* Message/Comment - Click event listener for closing the Modal thru backdrop */ 
    window.addEventListener("click", (event) => {
        if(event.target.classList.value === "modal"){
            closeModal(event.target);
        }
    });
});

/**
* DOCU: This will handle showing of create message modal. <br>
* Triggered: #create_message_button <br>
* Last Updated Date: October 25, 2022
* @function
* @memberOf dashboard.js
* @author Jerwin
*/  
showCreateMessageModal = () => {
    let create_message_modal = document.getElementById("create_message_modal");
    create_message_modal.querySelector("textarea").value = "";
    create_message_modal.querySelector("textarea").classList.remove("error_input");

    showModal("create_message_modal");
}

/**
* DOCU: This will handle creating of new message. <br>
* Triggered: #create_message_form <br>
* Last Updated Date: October 25, 2022
* @function
* @memberOf dashboard.js
* @author Jerwin
*/  
submitCreateNewMessageForm = (event) => {
    event.preventDefault();
    let create_message_form = document.getElementById("create_message_form");
    let create_message_input = create_message_form.querySelector("#create_message_input");

    /* Validate's the input */ 
    validateInput(create_message_input);

    /* If the form inputs are all passed, proceed with appending of new message. */ 
    if(!create_message_form.querySelectorAll(".error_input").length){
        let message_node = document.getElementById("clone_item_list").firstElementChild;
        let message_clone = message_node.cloneNode(true);

        /* Update's the content of cloned message item */ 
        message_clone.querySelector("p").innerText = create_message_input.value;
        message_clone.removeAttribute("id");
        message_clone.setAttribute("data-message-id", generateRandomID());
        
        /* Message - Click Event listener for delete_message_button that will trigger showing of delete message modal */ 
        message_clone.querySelector(".delete_message_button").addEventListener("click", showDeleteMessageModal);
        /* Message/Comment - Click Event listener for showing the editor for editing message or comment text */ 
        message_clone.querySelector(".edit_button").addEventListener("click", showEditMessage);
        /* Message - Click Event listener for Toggle Show Comments */ 
        message_clone.querySelector(".comments_button").addEventListener("click", toggleShowComments);
        /* Comment - Submit event listener for creating comment */
        message_clone.querySelector(".create_comment_form").addEventListener("submit", submitCreateCommentForm);

        /* Prepend on the messages list */ 
        document.getElementById("messages_list").prepend(message_clone);

        /* Update's the messages counter */ 
        document.getElementById("messages_counter").textContent = document.querySelectorAll("#messages_list >li").length;

        /* Close the modal */ 
        closeModal(create_message_input.closest(".modal"));
    }
}


/**
* DOCU: This will handle deleting of message. <br>
* Triggered: #delete_message_form <br>
* Last Updated Date: October 25, 2022
* @function
* @memberOf dashboard.js
* @author Jerwin
*/  
submitDeleteMessageForm = (event) => {
    event.preventDefault();
    let delete_message_form = document.getElementById("delete_message_form");

    /* Remove's the message based on the passed message_id */ 
    document.getElementById("messages_list").querySelector(`li[data-message-id='${ delete_message_form.querySelector("input[name='message_id']").value   }']`).remove();
     
    /* Update's the messages counter */ 
    document.getElementById("messages_counter").textContent = document.querySelectorAll("#messages_list >li").length;

    /* Close the modal */ 
    closeModal(delete_message_form.closest(".modal"));
}

/**
* DOCU: This will handle deleting of comment. <br>
* Triggered: #delete_comment_form <br>
* Last Updated Date: October 25, 2022
* @function
* @memberOf dashboard.js
* @author Jerwin
*/  
submitDeleteCommentForm = (event) => {
    event.preventDefault();
    let delete_comment_form = document.getElementById("delete_comment_form");
    let comment_id = delete_comment_form.querySelector("input[name='comment_id']").value;
    let comment_item = document.getElementById("messages_list").querySelector(`li[data-comment-id='${ comment_id  }']`);

    /* This will update the comments counter. */ 
    comment_item.closest("li[data-message-id]").querySelector(".comments_counter").textContent = comment_item.closest("li[data-message-id]").querySelectorAll(".comments_list li").length - 1;

    /* Remove's the message based on the passed message_id */ 
    document.getElementById("messages_list").querySelector(`li[data-comment-id='${ comment_id  }']`).remove();

    /* Close the modal */ 
    closeModal(delete_comment_form.closest(".modal"));
}

/**
* DOCU: This will handle showing of confirm delete message modal. <br>
* Triggered: .delete_message_button <br>
* Last Updated Date: October 25, 2022
* @function
* @memberOf dashboard.js
* @author Jerwin
*/  
showDeleteMessageModal = (event) => {
    /* Update's the hidden value of delete_message_modal with selected item id */ 
    document.getElementById("delete_message_modal").querySelector("input[name='message_id']").value = event.target.closest("li").getAttribute("data-message-id");
    showModal("delete_message_modal");
}

/**
* DOCU: This will handle toggle show and hide of comments list of a message. <br>
* Triggered: .comments_button <br>
* Last Updated Date: October 25, 2022
* @function
* @memberOf dashboard.js
* @author Jerwin
*/ 
toggleShowComments = (event) => {
    let selector = event.target;

    /* Hide comments list */ 
    if(selector.classList[selector.classList.length - 1] === "active"){
        selector.classList.remove("active");
        selector.closest("li").querySelector(".comments_container").classList.add("hidden");
    }
    /* Show comments list */ 
    else{
        selector.classList.add("active");
        selector.closest("li").querySelector(".comments_container").classList.remove("hidden");
    }
}

/**
* DOCU: This will handle showing of edit message/comment input. <br>
* Triggered: .edit_button <br>
* Last Updated Date: October 25, 2022
* @function
* @memberOf dashboard.js
* @author Jerwin
*/ 
showEditMessage = (event) => {
    let edit_button = event.target;
    let message = edit_button.closest("li").querySelector("p");
    let textarea = document.createElement("textarea");
    textarea.classList.add("message_editor");
    textarea.value = message.innerText;
    message.replaceWith(textarea);

    textarea.focus();
    textarea.addEventListener("blur", function() {
        saveMessage(textarea);
    });

    edit_button.closest(".edit_button").classList.add("hidden");
}

/**
* DOCU: This will handle saving of edited message on blur. <br>
* Triggered: .edit_button <br>
* Last Updated Date: October 25, 2022
* @function
* @memberOf dashboard.js
* @author Jerwin
*/ 
showEditMessage = (selector) => {
    /* This will valdiate the input */ 
    validateInput(selector);

    /* Do not update the message if it has error */ 
    if(selector.classList[selector.classList.length - 1] !== "error_input"){
        let paragraph = document.createElement("p");
        paragraph.innerText = selector.value;
    
        selector.closest("li").querySelector(".edit_button").classList.remove("hidden");
    
        selector.replaceWith(paragraph);
    }
}

/**
* DOCU: This will handle creating of comment <br>
* Triggered: .create_comment_form <br>
* Last Updated Date: October 25, 2022
* @function
* @memberOf dashboard.js
* @author Jerwin
*/ 
submitCreateCommentForm = (event) => {
    event.preventDefault();
    let create_comment_form = event.target;
    let comment_textarea = create_comment_form.querySelector("textarea");

    /* This will valdiate the input */ 
    validateInput(comment_textarea);    
    
    /* If the form inputs are all passed, proceed with appending of new comment. */ 
    if(!create_comment_form.querySelectorAll(".error_input").length){
        let comment_node = document.getElementById("clone_item_list").lastElementChild;
        let comment_clone = comment_node.cloneNode(true);
        let comments_list = create_comment_form.closest(".comments_container").querySelector(".comments_list");

        /* Update's the content of cloned message item */ 
        comment_clone.querySelector("p").innerText = comment_textarea.value;
        comment_clone.removeAttribute("id");
        comment_clone.setAttribute("data-comment-id", generateRandomID());

        /* Comment - Click event listener for showing the Confirm Delete Message modal */
        comment_clone.querySelector(".delete_comment_button").addEventListener("click", showDeleteCommentModal);
        /* Message/Comment - Click Event listener for showing the editor for editing message or comment text */
        comment_clone.querySelector(".edit_button").addEventListener("click", showEditMessage);

        /* Prepend on the comments list */ 
        comments_list.prepend(comment_clone);

        /* Update's the comments counter */ 
        create_comment_form.closest("li").querySelector(".comments_counter").textContent = comments_list.querySelectorAll("li").length;

        /* Reset's the value of textarea */ 
        comment_textarea.value = "";
    }

    return false;
}

/**
* DOCU: This will handle showing of delete comment modal. <br>
* Triggered: .delete_comment_button <br>
* Last Updated Date: October 25, 2022
* @function
* @memberOf dashboard.js
* @author Jerwin
*/ 
showDeleteCommentModal = (event) => {
    /* Update's the hidden value of delete_comment_modal with selected item id */ 
    document.getElementById("delete_comment_modal").querySelector("input[name='comment_id']").value = event.target.closest("li").getAttribute("data-comment-id");
    showModal("delete_comment_modal");
}