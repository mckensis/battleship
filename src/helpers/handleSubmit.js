//Handles basic validity checking of player name inputs
function handleSubmit(e, form) {
    e.preventDefault();
    let status = form.checkValidity();
    form.reportValidity();
    if (status) {
        return true;
    }
    return false;
}

export default handleSubmit;