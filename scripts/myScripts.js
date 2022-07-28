let alert_button = document.querySelector('#AlertBtn');
alert_button.addEventListener('click', function(e){
    alert("A Built-In Alert!");
})

let confirm_button = document.querySelector('#ConfirmBtn');
let confirmOut = document.querySelector("#confirmOut");
confirm_button.addEventListener('click', (e) => {
    confirmOut.value = `The value returned by the confirm method is : ${confirm("A Confirmation?")}`
});
    
let prompt_button = document.querySelector('#PromptBtn');
let promptOut = document.querySelector("#promptOut");
prompt_button.addEventListener('click', (e) =>{
    response = prompt("A Prompt?");
    if (response === ""){
        promptOut.value = `User didn't enter anything`;
    }else if (response === null){
        promptOut.value = '';
    }else{
        promptOut.value = `User's response: ${response}`;
    }
})

let safer_prompt_button = document.querySelector('#SaferPromptBtn');
let saferPromptOut = document.querySelector("#saferPromptOut");
safer_prompt_button.addEventListener('click', (e) =>{
    response = DOMPurify.sanitize(prompt("A Prompt?"));
    if (response === ""){
        saferPromptOut.value = `User didn't enter anything`;
    }else if (response === null){
        promptOut.value = '';
    }else{
        saferPromptOut.value = `User's response ${response}`;
    }
})


