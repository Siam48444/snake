export const eatSound = new Audio('./assets/sounds/eat.mp3');
export const hitSound = new Audio('./assets/sounds/hit.mp3');



// Plays the sound
export function playSound(sound) {
	sound.currentTime = 0;
	sound.play();
}