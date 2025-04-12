export const eatSound = new Audio('./assets/sounds/eat.mp3');



// Plays the sound
export function playSound(sound) {
	sound.currenTime = 0;
	sound.play();
}