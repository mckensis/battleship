function resetForm(form) {
    for (const input of form) {
        if (input.type === 'text') {
            input.value = '';
        }
        if (input.type === 'checkbox') {
            input.checked = false;
        }
        if (input.disabled) {
            input.disabled = false;
        }
    }
}

export default resetForm;