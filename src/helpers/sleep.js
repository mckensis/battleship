//Function to slow down the AI player's turns
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default sleep;