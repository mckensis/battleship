//The announcer for the game
async function announce(data) {
    let announcements = document.querySelector('.announcements');
    let type = data.type;
    let player = data.player;

    switch (type) {
        case 'turn':
            announcements.textContent = `It's ${player.name}'s turn!`;
            break;
        case 'all sunk':
            announcements.textContent = `All of ${player.name}'s ships have been sunk!`;
            break;
        case 'thinking':
            announcements.textContent = `${player.name} is thinking...`;
            break;
        case 'miss':
            announcements.textContent = `${player.name} missed!`;
            break;
    }
}

export default announce;