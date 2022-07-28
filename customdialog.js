export function cAlert() {
    let alertdlg = document.querySelector('#AlertDlg')
    let alert_button = document.querySelector('#AlertBtn');

    alert_button.addEventListener('click', function(e){
        alertdlg.showModal();
    })
  }

export function cConfirm() {
    let confirm_button = document.querySelector('#ConfirmBtn');
    let confirmdlg = document.querySelector('#ConfirmDlg')
    let confirmOut = document.querySelector("#confirmOut");

    confirm_button.addEventListener('click', function(e){
        confirmdlg.showModal();
    })

    confirmdlg.addEventListener('close', function(e){
        confirmOut.value = `The value returned by the confirm method is : ${confirmdlg.returnValue}`;
    });
}

export function cPrompt() {
    let prompt_button = document.querySelector('#PromptBtn');
    let promptdlg = document.querySelector('#PromptDlg');
    let promptOut = document.querySelector('#promptOut');

    prompt_button.addEventListener('click', function(e){
        promptdlg.showModal();
    })
    promptdlg.addEventListener('close', function(e){
        let response = DOMPurify.sanitize(document.getElementById('promptName').value)
        if (response === ""){
            promptOut.value  = `User didn't enter anything`;
        }else{
            promptOut.value  = `Prompt Result: ${response}`;
        }
    });
}