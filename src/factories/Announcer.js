import hit from '../assets/sounds/hit.wav';
import gameover from '../assets/sounds/gameover.wav';
import sunk from '../assets/sounds/sunk.wav';

class Announcer {
    constructor() {
        this.audio = new Audio();
        this.audio.volume = 0.1;
        this.announcements = document.querySelector('.announcements');
    }

    announce(player, type) {
        switch (type) {
            case 'turn':
                if (player.cpu) {
                    this.announcements.textContent = `${player.name} is thinking...`;
                } else {
                    this.announcements.textContent = `${player.name}'s turn...`;
                }
                break;
            case 'miss':
                this.announcements.textContent = `${player.name} missed!`;
                break;
            case 'hit':
                this.audio.src = hit;
                this.audio.play();
                this.announcements.textContent = `${player.name} hit a ship!`;
                break;
            case 'sunk':
                this.audio.src = sunk;
                this.audio.play();
                this.announcements.textContent = `${[player.name]} sunk a ship!`;
                break;
            case 'gameover':
                this.announcements.textContent = `${player.name} wins!`;       
                this.audio.src = gameover;
                this.audio.play();
                break;
        }
    }
}

export default Announcer;