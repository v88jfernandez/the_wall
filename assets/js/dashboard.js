document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("create_message_button").addEventListener("click", showCreateMessageModal);
    document.getElementById("create_message_form").addEventListener("submit", submitCreateNewMessageForm);

    /* Show Confirm Delete Message modal */ 
    let delete_message_button = document.querySelectorAll(".delete_message_button");
    for (let delete_message_button_counter = 0; delete_message_button_counter < delete_message_button.length; delete_message_button_counter++) {
        delete_message_button[delete_message_button_counter].addEventListener("click", showDeleteMessageModal);
    }
    /* Submit Delete message form */ 
    document.getElementById("delete_message_form").addEventListener("submit", submitDeleteMessageForm);

    /* Close Modal */ 
    let close_modal_button = document.querySelectorAll(".close_modal_button");
    for (let close_modal_button_counter = 0; close_modal_button_counter < close_modal_button.length; close_modal_button_counter++) {
        close_modal_button[close_modal_button_counter].addEventListener("click", function() {
            closeModal(close_modal_button[close_modal_button_counter].closest(".modal"));
        });
    }

    /* Toggle Show Comments */ 
    let comments_button = document.querySelectorAll(".comments_button");
    for (let comments_button_counter = 0; comments_button_counter < comments_button.length; comments_button_counter++) {
        comments_button[comments_button_counter].addEventListener("click", toggleShowComments);
    }

    /* Closing Modal thru backdrop */ 
    window.addEventListener("click", (event) => {
        if(event.target.classList.value === "modal"){
            closeModal(event.target);
        }
    });

    let edit_button = document.querySelectorAll(".edit_button");
    for (let edit_button_counter = 0; edit_button_counter < edit_button.length; edit_button_counter++) {
        edit_button[edit_button_counter].addEventListener("click", showEditMessage);
    }


    /*  */ 
    let create_comment_form = document.querySelectorAll(".create_comment_form");
    for (let create_comment_form_counter= 0; create_comment_form_counter < create_comment_form.length; create_comment_form_counter++) {
        create_comment_form[create_comment_form_counter].addEventListener("submit", submitCreateCommentForm);
    }

    /* Show Confirm Delete Message modal */ 
    let delete_comment_button = document.querySelectorAll(".delete_comment_button");
    for (let delete_comment_button_counter = 0; delete_comment_button_counter < delete_comment_button.length; delete_comment_button_counter++) {
        delete_comment_button[delete_comment_button_counter].addEventListener("click", showDeleteCommentModal);
    }

    /* Submit Delete comment form */ 
    document.getElementById("delete_comment_form").addEventListener("submit", submitDeleteCommentForm);

});

showCreateMessageModal = () => {
    let create_message_modal = document.getElementById("create_message_modal");
    create_message_modal.querySelector("textarea").value = "";
    create_message_modal.querySelector("textarea").classList.remove("error_input");

    showModal("create_message_modal");
}

submitCreateNewMessageForm = (event) => {
    event.preventDefault();
    let create_message_form = document.getElementById("create_message_form");
    let create_message_input = create_message_form.querySelector("#create_message_input");

    validateInput(create_message_input);

    if(!create_message_form.querySelectorAll(".error_input").length){
        let message_node = document.getElementById("clone_item_list").firstElementChild;
        let message_clone = message_node.cloneNode(true);

        /* Update's the content of cloned message item */ 
        message_clone.querySelector("p").innerText = create_message_input.value;
        message_clone.removeAttribute("id");
        message_clone.setAttribute("data-message-id", generateRandomID());
        
        /* Add click event lister for delete message item */ 
        message_clone.querySelector(".delete_message_button").addEventListener("click", showDeleteMessageModal);

        message_clone.querySelector(".edit_button").addEventListener("click", showEditMessage);

        message_clone.querySelector(".comments_button").addEventListener("click", toggleShowComments);

        message_clone.querySelector(".create_comment_form").addEventListener("submit", submitCreateCommentForm);

        /* Prepend on the messages list */ 
        document.getElementById("messages_list").prepend(message_clone);

        /* Update's the messages counter */ 
        document.getElementById("messages_counter").textContent = document.querySelectorAll("#messages_list >li").length;

        /* Close the modal */ 
        closeModal(create_message_input.closest(".modal"));
    }
    
}

showDeleteMessageModal = (event) => {
    /* Update's the hidden value of delete_message_modal with selected item id */ 
    document.getElementById("delete_message_modal").querySelector("input[name='message_id']").value = event.target.closest("li").getAttribute("data-message-id");
    showModal("delete_message_modal");
}

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

toggleShowComments = (event) => {
    let selector = event.target;

    if(selector.classList[selector.classList.length - 1] === "active"){
        selector.classList.remove("active");
        selector.closest("li").querySelector(".comments_container").classList.add("hidden");
    }
    else{
        selector.classList.add("active");
        selector.closest("li").querySelector(".comments_container").classList.remove("hidden");
    }
}

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

saveMessage = (selector) => {
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

submitCreateCommentForm = (event) => {
    event.preventDefault();
    let create_comment_form = event.target;
    let comment_textarea = create_comment_form.querySelector("textarea");

    /* This will valdiate the input */ 
    validateInput(comment_textarea);    
    
    if(!create_comment_form.querySelectorAll(".error_input").length){
        let comment_node = document.getElementById("clone_item_list").lastElementChild;
        let comment_clone = comment_node.cloneNode(true);
        let comments_list = create_comment_form.closest(".comments_container").querySelector(".comments_list");

        /* Update's the content of cloned message item */ 
        comment_clone.querySelector("p").innerText = comment_textarea.value;
        comment_clone.removeAttribute("id");
        comment_clone.setAttribute("data-comment-id", generateRandomID());

        /* Add click event lister for delete comment item */ 
        comment_clone.querySelector(".delete_comment_button").addEventListener("click", showDeleteCommentModal);

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


showDeleteCommentModal = (event) => {
    /* Update's the hidden value of delete_comment_modal with selected item id */ 
    document.getElementById("delete_comment_modal").querySelector("input[name='comment_id']").value = event.target.closest("li").getAttribute("data-comment-id");
    showModal("delete_comment_modal");
}


submitDeleteCommentForm = (event) => {
    event.preventDefault();
    let delete_comment_form = document.getElementById("delete_comment_form");
    let comment_id = delete_comment_form.querySelector("input[name='comment_id']").value;
    let comment_item = document.getElementById("messages_list").querySelector(`li[data-comment-id='${ comment_id  }']`);

    comment_item.closest("li[data-message-id]").querySelector(".comments_counter").textContent = comment_item.closest("li[data-message-id]").querySelectorAll(".comments_list li").length - 1;

    /* Remove's the message based on the passed message_id */ 
    document.getElementById("messages_list").querySelector(`li[data-comment-id='${ comment_id  }']`).remove();

    /* Close the modal */ 
    closeModal(delete_comment_form.closest(".modal"));
}