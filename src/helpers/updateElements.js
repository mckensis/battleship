function removeForm() {
    document.querySelector('.formContainer').remove();
    return;
}

function addMainDisplay() {
    document.querySelector('.gameplay').style.display = 'grid';
}

export { removeForm, addMainDisplay };